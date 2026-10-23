"""Preserve public Webador images without resizing or editing their bytes."""
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit, unquote, urljoin
import urllib.request, concurrent.futures, re, html, json, hashlib, csv, shutil, time
from PIL import Image

SITE = Path(__file__).resolve().parents[1]
BACKUP = SITE.parent / 'richmondhill-ca-seo-backup-2026-10-22'
DEST = SITE / 'public/images/webador'
ARCHIVE = BACKUP / 'images'
DEST.mkdir(parents=True, exist_ok=True)
ARCHIVE.mkdir(exist_ok=True)
records = json.loads((BACKUP/'url-inventory.json').read_text(encoding='utf-8'))
assets = {}
pattern = re.compile(r'https?://[^\s\"\'<>\\]+?\.(?:png|jpe?g|webp|gif|svg|avif|ico)(?:\?[^\s\"\'<>\\)]*)?', re.I)
def add(url, page_url, alt=None):
    url = html.unescape(url).replace('\\/','/')
    parts = urlsplit(url)
    if parts.hostname != 'primary.jwwb.nl': return
    base = urlunsplit(parts._replace(query='',fragment=''))
    entry = assets.setdefault(base, {'source_url':base,'published_variants':set(),'pages':set(),'alt_texts':set()})
    entry['published_variants'].add(url)
    entry['pages'].add(page_url)
    if alt is not None: entry['alt_texts'].add(alt)

for record in records:
    source = html.unescape((BACKUP/record['html_file']).read_text(encoding='utf-8')).replace('\\/','/')
    for match in pattern.findall(source): add(match, record['url'])
    for image in record.get('images',[]):
        if image.get('src'): add(urljoin(record['url'],image['src']),record['url'],image.get('alt',''))
        for candidate in image.get('srcset','').split(', '):
            url = re.sub(r'\s+\d+(?:\.\d+)?[wx]$','',candidate.strip())
            if url.startswith('http'): add(url,record['url'],image.get('alt',''))

names = {}
for url,entry in assets.items():
    name = unquote(urlsplit(url).path.rsplit('/',1)[-1])
    name = re.sub(r'[^A-Za-z0-9._-]','-',name)
    if name in names and names[name] != url:
        name = hashlib.sha256(url.encode()).hexdigest()[:8]+'-'+name
    names[name] = url
    entry['filename']=name

def fetch(entry):
    entry = dict(entry)
    variants = sorted(entry['published_variants'])
    for key in ['published_variants','pages','alt_texts']: entry[key] = sorted(entry[key])
    candidates = [entry['source_url']] + sorted(variants,key=lambda u: int((re.search(r'(?:width|height)=(\d+)',u) or [0,'0'])[1]),reverse=True)
    errors=[]
    for url in dict.fromkeys(candidates):
        for attempt in range(2):
            try:
                request=urllib.request.Request(url,headers={'User-Agent':'RichmondHillCollege-Owner-ImageBackup/1.0'})
                with urllib.request.urlopen(request,timeout=45) as response:
                    mime=response.headers.get('Content-Type','').split(';')[0]
                    data=response.read()
                    final=response.geturl()
                if not mime.startswith('image/'): raise ValueError('Unexpected image response type: '+mime)
                target=DEST/entry['filename']
                target.write_bytes(data)
                if mime!='image/svg+xml':
                    with Image.open(target) as image:
                        width,height=image.size
                        image_format=image.format
                        image.verify()
                else: width=height=None;image_format='SVG'
                shutil.copyfile(target,ARCHIVE/entry['filename'])
                entry.update({'status':'downloaded','downloaded_url':url,'final_url':final,'content_type':mime,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'width':width,'height':height,'format':image_format,'local_path':'/images/webador/'+entry['filename'],'unmodified_original':url==entry['source_url'],'cloudflare_asset_limit_ok':len(data)<25*1024*1024})
                return entry
            except Exception as error:
                errors.append(type(error).__name__+': '+str(error))
                if attempt==0: time.sleep(0.3)
    entry.update({'status':'failed','errors':errors})
    return entry

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    results=[]
    for result in executor.map(fetch,[assets[url] for url in sorted(assets)]):
        results.append(result)
        print(result['status'],result['filename'],result.get('bytes',0),flush=True)

(BACKUP/'image-inventory.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
fields=['source_url','filename','status','local_path','downloaded_url','unmodified_original','width','height','bytes','sha256','alt_texts','pages','published_variants']
with (BACKUP/'image-migration-map.csv').open('w',encoding='utf-8-sig',newline='') as f:
    writer=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');writer.writeheader()
    for r in results:
        row=dict(r)
        for k in ['alt_texts','pages','published_variants']: row[k]=' | '.join(row[k])
        writer.writerow(row)
mapping={r['source_url']:r['local_path'] for r in results if r['status']=='downloaded'}
(SITE/'lib/webador-image-map.ts').write_text('// Archived originals from the public Webador site. File bytes are unchanged.\nexport const WEBADOR_IMAGE_MAP: Readonly<Record<string, string>> = '+json.dumps(mapping,ensure_ascii=False,indent=2)+';\n\n/** Resolve published size/crop variants to the independently hosted original. */\nexport function localWebadorImage(source: string): string {\n  try {\n    const url = new URL(source);\n    if (url.hostname !== "primary.jwwb.nl") return source;\n    url.search = "";\n    url.hash = "";\n    return WEBADOR_IMAGE_MAP[url.toString()] ?? source;\n  } catch { return source; }\n}\n',encoding='utf-8')
summary={'source_paths':len(assets),'downloaded':len(mapping),'failed':[r['source_url'] for r in results if r['status']!='downloaded'],'total_bytes':sum(r.get('bytes',0) for r in results),'exact_originals':sum(r.get('unmodified_original',False) for r in results),'published_variants':sum(len(r['published_variants']) for r in results),'source_pages':len(records),'asset_limit_failures':[r['source_url'] for r in results if r.get('cloudflare_asset_limit_ok') is False],'note':'Files are unmodified originals where the query-free source works. Published resize/crop URLs and original alt text are recorded. CDN URLs on primary.jwwb.nl cannot be redirected by changing .ca DNS.'}
(BACKUP/'image-backup-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2),flush=True)
if summary['failed'] or summary['asset_limit_failures']: raise SystemExit(1)

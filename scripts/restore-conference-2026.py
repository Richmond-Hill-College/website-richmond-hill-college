"""Extract reviewed, script-free conference content from the owner's Webador backup."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, urljoin
import html, json, re, urllib.request, zipfile, shutil

ROOT=Path(__file__).resolve().parents[1]
BACKUP=ROOT.parent/'richmondhill-ca-seo-backup-2026-10-22'
PREFIX='/conferences/nursing-and-healthcare-2026'
PAGES={'overview':PREFIX,'details':PREFIX+'/confernce-main-pages','sponsors':PREFIX+'/sponsership-and-partnership'}
RECORDS=json.loads((BACKUP/'url-inventory.json').read_text(encoding='utf-8'))
IMAGES={r['source_url']:r for r in json.loads((BACKUP/'image-inventory.json').read_text(encoding='utf-8'))}
VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Node:
    def __init__(self,tag='',attrs=()): self.tag=tag;self.attrs=dict(attrs);self.children=[]
    def has(self,cls): return cls in self.attrs.get('class','').split()
    def text(self): return ''.join(c.text() if isinstance(c,Node) else c for c in self.children)
    def find(self,predicate):
        if predicate(self): yield self
        for c in self.children:
            if isinstance(c,Node): yield from c.find(predicate)
class Parser(HTMLParser):
    def __init__(self,source):
        super().__init__(convert_charrefs=True);self.root=Node();self.stack=[self.root];self.feed(source)
    def handle_starttag(self,tag,attrs):
        n=Node(tag,attrs);self.stack[-1].children.append(n)
        if tag not in VOID:self.stack.append(n)
    def handle_startendtag(self,tag,attrs): self.handle_starttag(tag,attrs);self.handle_endtag(tag)
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].tag==tag:self.stack=self.stack[:i];break
    def handle_data(self,data): self.stack[-1].children.append(data)

DOWNLOAD_URL='https://www.richmondhillcollege.ca/_downloads/3782770cc79861ba2ca1d6fd7c4efad4'
DOWNLOAD_PATH='/downloads/conference-2026/abstract-template.docx'
target=ROOT/'public'/DOWNLOAD_PATH.lstrip('/')
target.parent.mkdir(parents=True,exist_ok=True)
with urllib.request.urlopen(urllib.request.Request(DOWNLOAD_URL,headers={'User-Agent':'RichmondHillCollege-Owner-Restoration/1.0'}),timeout=30) as response: target.write_bytes(response.read())
with zipfile.ZipFile(target) as document: assert 'word/document.xml' in document.namelist()
(BACKUP/'documents').mkdir(exist_ok=True)
shutil.copyfile(target,BACKUP/'documents'/'abstract-template.docx')

def clean_text(text):
    text=re.sub(r'November\s+28[–-]30,?\s*2025','September 17–19, 2026',text)
    return text
def href(value):
    if value==DOWNLOAD_URL or value==urlsplit(DOWNLOAD_URL).path:return DOWNLOAD_PATH
    p=urlsplit(value)
    if p.hostname in ['www.richmondhillcollege.ca','richmondhillcollege.ca']:value=p.path+('?' + p.query if p.query else '')+('#'+p.fragment if p.fragment else '')
    if value.startswith('/conferences/nursing-and-healthcare-2025'):
        return '/contact'
    if value.startswith('/conferences/nursing-and-healthcare/'):
        tail=value.rsplit('/',1)[-1]
        if tail=='sponsorship':return PREFIX+'/sponsership-and-partnership'
        if tail in ['conference-main-page','about-the-conference']:return PREFIX+'/confernce-main-pages'
        return '/contact'
    if value.startswith(('https://','http://','mailto:','tel:','/','#')):return value
    return ''
ALLOWED={'p','h2','h3','h4','ul','ol','li','strong','em','b','i','a','br','table','thead','tbody','tr','th','td','sup','sub','blockquote','caption'}
def sanitize(n):
    if isinstance(n,str):return html.escape(clean_text(n))
    if n.tag in ['script','style','iframe','form','input','button','select','textarea','object','embed']:return ''
    content=''.join(sanitize(c) for c in n.children)
    tag='h2' if n.tag=='h1' else n.tag
    if tag not in ALLOWED:return content
    attrs=''
    if tag=='a':
        link=href(n.attrs.get('href',''))
        if not link:return content
        attrs=' href="'+html.escape(link,quote=True)+'"'
    if tag in ['td','th']:
        for key in ['colspan','rowspan']:
            if n.attrs.get(key,'').isdigit():attrs+=' '+key+'="'+n.attrs[key]+'"'
    return '<'+tag+attrs+'>'+content+('' if tag=='br' else '</'+tag+'>')

output={}
for key,path in PAGES.items():
    record=next(r for r in RECORDS if r['url']=='https://www.richmondhillcollege.ca'+path)
    doc=Parser((BACKUP/record['html_file']).read_text(encoding='utf-8'))
    main=next(doc.root.find(lambda n:n.tag=='main' and n.attrs.get('id')=='main-content'))
    blocks=[];seen=set()
    def walk(node):
        if node.has('jw-album-gallery'):
            images=[]
            for link in node.find(lambda n:n.tag=='a' and n.attrs.get('data-full')):
                src=urlsplit(link.attrs['data-full'])._replace(query='',fragment='').geturl()
                asset=IMAGES.get(src)
                if not asset:raise ValueError('Unarchived gallery image: '+src)
                alt=''
                if 'aframedico' in asset['filename']:alt='AfraMedico, Gold Sponsor of the 2026 conference'
                for fragment,country in [('usa','the United States'),('canada','Canada'),('china','China'),('france','France'),('ghana','Ghana'),('south-africa','South Africa'),('kenya','Kenya'),('nigeria','Nigeria'),('india','India'),('iran','Iran'),('turkey','Turkey'),('morocco','Morocco'),('uae','the United Arab Emirates')]:
                    if fragment in asset['filename']:alt='Flag of '+country;break
                images.append({'src':asset['local_path'],'width':asset['width'],'height':asset['height'],'alt':alt})
            if images:blocks.append({'type':'gallery','images':images})
            return
        if node.has('jw-button'):
            link=next(node.find(lambda n:n.tag=='a'),None)
            if link:
                label=' '.join(link.text().split())
                if 'Sponsorship Information' in label or 'AfraMedico' in label:
                    target=href(link.attrs.get('href',''))
                    if target:blocks.append({'type':'html','html':'<p><a href="'+html.escape(target,quote=True)+'">'+html.escape(label)+'</a></p>'})
            return
        if node.has('jw-element-imagetext-text'):
            plain=' '.join(node.text().split())
            if not plain or plain in seen:return
            seen.add(plain)
            if plain.startswith('Welcome to the 2nd'):
                for c in node.children:
                    if isinstance(c,Node) and c.tag=='h1': node.children.remove(c);break
            if 'Early Bird Registration:' in plain:
                markup='<h2>Registration Information</h2><p>Registration for the September 2026 conference is closed. Contact Richmond Hill College for information about future conferences.</p>'
            elif 'Conference Venue (Preliminary Plan)' in plain or 'For Participants Booking Accommodation:' in plain:
                markup='<h2>Conference Venue and Accommodation</h2><p>The 2026 conference was held in Toronto, Canada. Contact the organizers for archived venue and accommodation information.</p>'
            elif plain.startswith('Promotional offer') or plain.startswith("Don't miss out on the chance to save"):
                return
            else:
                markup=''.join(sanitize(c) for c in node.children)
                # The inherited 2025 abstract deadline is not a valid 2026 deadline.
                markup=re.sub(r'<li><strong>Deadline</strong>.*?</li>','<li><strong>Submissions:</strong> Abstract submissions for the 2026 edition are closed.</li>',markup,flags=re.S)
                markup=re.sub(r'\[insert tentative confirmation date[^]]*\]','contact the organizers',markup)
            if '2025' in markup: raise ValueError('Unreviewed 2025 content in '+key+': '+markup[:100])
            if markup.strip():blocks.append({'type':'html','html':markup.strip()})
            return
        if node.tag=='table':
            blocks.append({'type':'html','html':sanitize(node)});return
        if node.has('jw-image'):
            image=next(node.find(lambda n:n.tag=='img'),None)
            if image:
                src=image.attrs.get('src','') or image.attrs.get('srcset','').split(' ')[0]
                src=urlsplit(html.unescape(src))._replace(query='',fragment='').geturl()
                asset=IMAGES.get(src)
                if not asset:raise ValueError('Unarchived image: '+src)
                # Banner is displayed once by the common archive layout.
                if 'advancing_nursing_and_healthecare_conference_canada' not in asset['filename']:
                    blocks.append({'type':'image','src':asset['local_path'],'width':asset['width'],'height':asset['height'],'alt':image.attrs.get('alt','')})
            return
        if node.has('jw-file'):
            blocks.append({'type':'html','html':'<p><a href="'+DOWNLOAD_PATH+'">Download the abstract template (Word document)</a></p>'});return
        for c in node.children:
            if isinstance(c,Node):walk(c)
    walk(main)
    description=clean_text(record['description'])
    if key=='sponsors':description='Archived sponsorship and partnership information for the Nursing and Healthcare Conference: A Global Dialogue, September 17–19, 2026, Toronto, Canada. View the published Platinum, Gold, Silver and Bronze packages and conference partners.'
    output[key]={'path':path,'originalTitle':record['title'],'description':description,'heading':'Conference Sponsorship and Partnership' if key=='sponsors' else '2nd International Conference on Nursing and Healthcare: A Global Dialogue (2026)','blocks':blocks,'sourceHtml':record['html_file']}
    print(key,len(blocks),'blocks',sum(len(b.get('html','')) for b in blocks),'HTML characters')

(ROOT/'lib/conference-2026-content.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

"""Post-deploy verification of legacy URL, SEO, assets and download preservation."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit
import urllib.request, urllib.error, json, xml.etree.ElementTree as ET, re, hashlib, concurrent.futures

ROOT=Path(__file__).resolve().parents[1]
BASE='https://richmond-hill-college-independent.richmond-hill-college.workers.dev'
DATA=json.loads((ROOT/'lib/conference-2026-content.json').read_text(encoding='utf-8'))
class Meta(HTMLParser):
    def __init__(self,source):
        super().__init__(convert_charrefs=True);self.h1=0;self.canonical='';self.robots='';self.images=[];self.links=[];self.alternates=[];self.title=[];self.in_title=False;self.feed(source)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='h1':self.h1+=1
        if tag=='title':self.in_title=True
        if tag=='meta' and a.get('name')=='robots':self.robots=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href','')
        if tag=='link' and a.get('rel')=='alternate':self.alternates.append(a)
        if tag=='img' and a.get('src'):self.images.append(a['src'])
        if tag=='a' and a.get('href'):self.links.append(a['href'])
    def handle_endtag(self,tag):
        if tag=='title':self.in_title=False
    def handle_data(self,text):
        if self.in_title:self.title.append(text)
def get(path,method='GET'):
    request=urllib.request.Request(urljoin(BASE,path),method=method,headers={'User-Agent':'RichmondHillCollege-Owner-ConferenceVerification/1.0'})
    with urllib.request.urlopen(request,timeout=45) as response:return response.status,response.geturl(),response.headers,response.read()
results=[];images=set();links=set()
for key,item in DATA.items():
    status,final,headers,body=get(item['path'])
    source=body.decode();meta=Meta(source)
    assert status==200 and urlsplit(final).path==item['path']
    assert meta.h1==1,(key,meta.h1)
    assert ''.join(meta.title)==item['originalTitle']
    assert meta.canonical=='https://www.richmondhillcollege.ca'+item['path']
    assert 'noindex' not in meta.robots.lower()
    assert all(a.get('hreflang')!='fr' for a in meta.alternates)
    article=re.search(r'<article\b.*?</article>',source,re.S)[0]
    assert 'Registration and sponsorship applications for this edition are closed.' in article
    assert not re.search(r'November\s+28.{0,12}2025|September 30, 2025|primary\.jwwb\.nl|<form\b|add.to.cart',article,re.I)
    rendered=Meta(article)
    images.update(rendered.images)
    links.update(h for h in rendered.links if h.startswith('/') and not h.startswith('//'))
    results.append({'page':key,'path':item['path'],'status':status,'title':''.join(meta.title),'canonical':meta.canonical,'h1_count':meta.h1,'image_count':len(rendered.images),'robots':meta.robots,'closed_archive_notice':True})
def asset(path):
    status,final,headers,body=get(path)
    assert status==200 and headers.get('Content-Type','').startswith('image/'),path
    return {'url':path,'status':status,'content_type':headers.get('Content-Type'),'bytes':len(body)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: image_results=list(pool.map(asset,sorted(images)))
def link(path):
    status,final,headers,body=get(path,'HEAD')
    assert status==200,path
    return {'path':path,'status':status,'final':final}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: link_results=list(pool.map(link,sorted(links)))
status,final,headers,body=get('/downloads/conference-2026/abstract-template.docx')
assert body==(ROOT/'public/downloads/conference-2026/abstract-template.docx').read_bytes()
download={'status':status,'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest()}
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs):return None
def redirect(path,target):
    try:
        opener=urllib.request.build_opener(NoRedirect)
        opener.open(urllib.request.Request(BASE+path,headers={'User-Agent':'RichmondHillCollege-Owner-ConferenceVerification/1.0'}),timeout=30)
        raise AssertionError('Expected permanent redirect: '+path)
    except urllib.error.HTTPError as error:
        assert error.code in [301,308],(path,error.code)
        location=error.headers.get('Location','')
        assert urlsplit(urljoin(BASE,location)).path==target,(path,location)
        return {'path':path,'status':error.code,'location':location}
redirects=[redirect('/fr'+p['path'],p['path']) for p in DATA.values()]
redirects.append(redirect('/_downloads/3782770cc79861ba2ca1d6fd7c4efad4','/downloads/conference-2026/abstract-template.docx'))
status,final,headers,body=get('/sitemap.xml')
urls=[e.text for e in ET.fromstring(body).iter() if e.tag.endswith('}loc')]
for p in DATA.values():
    assert urls.count('https://www.richmondhillcollege.ca'+p['path'])==1
    assert 'https://www.richmondhillcollege.ca/fr'+p['path'] not in urls
report={'pages':results,'rendered_images':image_results,'internal_links':link_results,'abstract_download':download,'permanent_redirects':redirects,'restored_sitemap_urls':[p['path'] for p in DATA.values()],'dns_changed':False}
target=ROOT.parent/'richmondhill-ca-seo-backup-2026-10-22/conference-2026-live-verification.json'
target.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'pages':len(results),'optimized_image_urls':len(image_results),'internal_links':len(link_results),'permanent_redirects':len(redirects),'abstract_download':download,'checks':'passed'},indent=2))

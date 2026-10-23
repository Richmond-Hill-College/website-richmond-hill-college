"""Check every backed-up sitemap URL, observed alias, and legacy utility URL."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import urllib.request, urllib.error, json, concurrent.futures, xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BACKUP = ROOT.parent / 'richmondhill-ca-seo-backup-2026-10-22'
BASE = 'https://richmond-hill-college-independent.richmond-hill-college.workers.dev'
CANONICAL = 'https://www.richmondhillcollege.ca'
records = json.loads((BACKUP / 'migration-map.json').read_text(encoding='utf-8'))
archives = json.loads((ROOT / 'lib/conference-2025-archive.json').read_text(encoding='utf-8'))
aliases = json.loads((ROOT / 'lib/legacy-redirects.json').read_text(encoding='utf-8'))
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.canonical = ''; self.robots = ''; self.title = ''; self.h1 = 0
        self.in_title = False; self.forms = 0; self.feed(source)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.h1 += 1
        if tag == 'form': self.forms += 1
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href', '')
        if tag == 'meta' and a.get('name') == 'robots': self.robots = a.get('content', '')
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
    def handle_data(self, data):
        if self.in_title: self.title += data
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl): return None
def get(path, follow=True):
    opener = urllib.request.build_opener() if follow else urllib.request.build_opener(NoRedirect)
    request = urllib.request.Request(BASE + path, headers={'User-Agent': 'RichmondHillCollege-Owner-Verification/1.0'})
    try:
        with opener.open(request, timeout=60) as response:
            return response.status, response.geturl(), response.headers, response.read().decode()
    except urllib.error.HTTPError as error:
        return error.code, error.url, error.headers, error.read().decode(errors='replace')

status, _, _, xml = get('/sitemap.xml')
assert status == 200
sitemap = {node.text.rstrip('/') for node in ET.fromstring(xml).findall('.//{*}loc')}
def check(record):
    path = urlsplit(record['old_url']).path
    status, final, headers, source = get(path)
    page = Page(source)
    errors = []
    if status != 200: errors.append('HTTP ' + str(status))
    if urlsplit(final).path != path: errors.append('unexpected destination ' + final)
    if page.canonical.rstrip('/') != (CANONICAL + path).rstrip('/'): errors.append('canonical ' + page.canonical)
    if 'noindex' in page.robots.lower() or 'noindex' in headers.get('X-Robots-Tag', '').lower(): errors.append('noindex')
    if (CANONICAL + path).rstrip('/') not in sitemap: errors.append('missing from sitemap')
    if page.h1 != 1: errors.append('H1 count ' + str(page.h1))
    archive = next((item for item in archives.values() if item['path'] == path), None)
    if archive:
        if page.title != archive['title']: errors.append('archive title changed')
        if 'Registration, abstract submissions and invitation-letter requests for this edition are closed.' not in source: errors.append('missing closed archive notice')
        if not path.endswith('/contact-1') and page.forms: errors.append('active form on closed archive')
    return {'path': path, 'status': status, 'title': page.title, 'canonical': page.canonical, 'robots': page.robots, 'h1_count': page.h1, 'errors': errors}
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    pages = list(pool.map(check, [r for r in records if r['in_old_sitemap']]))
redirects = []
for path, target in {**aliases, '/en/programs': '/programs', '/en/fees': '/bridging-programs'}.items():
    status, _, headers, _ = get(path + '?migration_check=1', follow=False)
    location = headers.get('Location', '')
    errors = []
    if status not in [301, 308]: errors.append('not permanent: ' + str(status))
    if urlsplit(location).path != target: errors.append('wrong destination ' + location)
    if urlsplit(location).query != 'migration_check=1': errors.append('lost query string')
    redirects.append({'path': path, 'status': status, 'location': location, 'errors': errors})
status, _, _, source = get('/wishlist'); wishlist = Page(source)
utility = {'path': '/wishlist', 'status': status, 'robots': wishlist.robots, 'errors': []}
if status != 200 or 'noindex' not in wishlist.robots: utility['errors'].append('wishlist should be available and noindex')
report = {'pages': pages, 'redirects': redirects, 'utility': utility, 'dns_changed': False}
(BACKUP / 'legacy-migration-live-verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
failures = [r for r in pages + redirects + [utility] if r['errors']]
print(json.dumps({'sitemap_pages_checked': len(pages), 'redirects_checked': len(redirects), 'failures': failures}, ensure_ascii=True, indent=2))
assert not failures, 'See legacy-migration-live-verification.json'

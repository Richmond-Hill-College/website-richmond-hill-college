"""Check the two existing search landing pages after the host migration build."""
from pathlib import Path
from html.parser import HTMLParser
import json, urllib.request

BASE = 'https://richmond-hill-college-independent.richmond-hill-college.workers.dev'
BACKUP = Path(__file__).resolve().parents[2] / 'richmondhill-ca-seo-backup-2026-10-22'
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.title = ''; self.description = ''; self.canonical = ''; self.h1 = 0
        self.in_title = False; self.words = []
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.h1 += 1
        if tag == 'meta' and a.get('name') == 'description': self.description = a.get('content')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
    def handle_data(self, data):
        self.words.append(data)
        if self.in_title: self.title += data

checks = [
    ('/', 'Richmond Hill College', 'Richmond Hill College offers specialized healthcare and technology management courses for professionals and career changers. Boost your career with flexible, targeted programs designed for quick learning and enhanced outcomes.', ['Welcome to Richmond Hill College', 'Flexible Learning Options']),
    ('/programs', 'Programs | Richmond Hill College', "Explore Richmond Hill College's programs in healthcare and technology. Choose from online, hybrid, and in-person courses tailored to equip you with career-ready skills.", ['Programs at Richmond Hill College', 'Flexible Learning Formats', 'Specialized Programs', 'Short Skilled Programs', 'International Bridge Programs', 'Certificates of Completion']),
]
results = []
for path, title, description, headings in checks:
    with urllib.request.urlopen(urllib.request.Request(BASE + path, headers={'User-Agent': 'RichmondHillCollege-Owner-Verification/1.0'}), timeout=60) as response:
        assert response.status == 200
        assert response.url == BASE + path, response.url
        page = Page(response.read().decode())
    assert page.title == title, page.title
    assert page.description == description, page.description
    assert page.canonical.rstrip('/') == ('https://www.richmondhillcollege.ca' + path).rstrip('/'), page.canonical
    assert page.h1 == 1, page.h1
    text = ' '.join(' '.join(page.words).split())
    for heading in headings: assert heading in text, heading
    results.append({'path': path, 'status': 200, 'title': page.title, 'description': page.description, 'canonical': page.canonical, 'h1_count': page.h1, 'preserved_sections': headings})
(BACKUP / 'home-programs-live-verification.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print('PASS: homepage and Programs titles, descriptions, canonicals, H1 counts and preserved sections.')

"""Browser tests for litetheskobro.com. Drives the installed Google Chrome through Playwright.

    uv run --with playwright python tests/test_site.py

Also regenerates og.png from tests/og.html. Screenshots and downloaded cards land in tests/out/.
"""
import http.server, socketserver, threading, os, sys, urllib.parse
from playwright.sync_api import sync_playwright

TESTS = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(TESTS)
OUT = os.path.join(TESTS, 'out'); os.makedirs(OUT, exist_ok=True)
os.chdir(SITE)

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), Quiet)
port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f'http://127.0.0.1:{port}'

results = []
def check(name, cond, extra=''):
    results.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ') + name + (f'  -> {extra}' if extra != '' else ''))

def card_bg(pg, sel='#quoteCard'):
    return pg.evaluate(f"getComputedStyle(document.querySelector('{sel}')).backgroundColor")

YELLOW, PINK, BLUE, GREEN = 'rgb(255, 210, 63)', 'rgb(255, 77, 141)', 'rgb(47, 91, 234)', 'rgb(23, 178, 106)'
wa_stub = lambda route: route.fulfill(status=200, content_type='text/html', body='<title>wa</title>stub')

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)

    # ------------------------------------------------------------ desktop
    ctx = browser.new_context(viewport={'width': 1440, 'height': 900}, permissions=['clipboard-read', 'clipboard-write'], accept_downloads=True)
    ctx.route('https://wa.me/**', wa_stub)
    page = ctx.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append('pageerror: ' + str(e)))
    page.on('console', lambda m: errors.append('console: ' + m.text) if m.type == 'error' else None)
    page.goto(BASE + '/'); page.wait_for_load_state('networkidle'); page.evaluate('document.fonts.ready')

    check('title', page.title() == 'Lite Thesko Bro', page.title())
    check('Anek Latin loaded', page.evaluate("[...document.fonts].some(f => f.family.includes('Anek') && f.status === 'loaded')"))
    check('no Telugu script in DOM', not page.evaluate("/[\\u0C00-\\u0C7F]/.test(document.body.innerText)"))
    n = page.evaluate('window.__ltb.quotes'); check('quotes >= 40', n >= 40, n)
    memes = page.locator('#memeGrid .meme').count(); check('9 meme cards', memes == 9, memes)
    dtxt = page.locator('#dMain').inner_text(); check('daily has a line', len(dtxt) > 10, dtxt)
    check('result hidden initially', page.locator('#result').is_hidden())
    page.screenshot(path=f'{OUT}/desktop.png', full_page=True)

    # generator flow
    page.fill('#tension', 'Manager Sunday kooda call chesthunnadu bro, chala tension!!')
    det = page.locator('#detected').inner_text(); check('auto-detect shows Office', det == 'Detect ayindi: Office', det)
    page.click('#goBtn'); page.wait_for_selector('#result:not([hidden])')
    level = int(page.locator('#levelNum').inner_text()); check('level in 1..10', 1 <= level <= 10, level)
    lname = page.locator('#levelName').inner_text(); check('level name shown', len(lname) > 5, lname)
    rx = page.locator('#rx').inner_text(); check('Rx shown', rx.startswith('Rx:'), rx)
    bars = page.locator('#bars i.on').count(); check('bars == level', bars == level, bars)
    q1 = page.locator('#qMain').inner_text(); check('quote shown', len(q1) > 10, q1)
    bg = card_bg(page); check('office card is blue', bg == BLUE, bg)
    ctr = page.locator('#counter').inner_text(); check('counter says 1', 'tensions: 1' in ctr, ctr)
    page.locator('#result').screenshot(path=f'{OUT}/result.png')

    page.click('#anotherBtn'); q2 = page.locator('#qMain').inner_text(); check('Inkoti gives a different line', q2 != q1, q2)
    ctr = page.locator('#counter').inner_text(); check('Inkoti does not bump counter', 'tensions: 1' in ctr, ctr)

    page.click('#copyBtn'); clip = page.evaluate('navigator.clipboard.readText()')
    check('copy has line + url', q2 in clip and 'litetheskobro.com' in clip, clip.replace('\n', ' | ')[:110])

    with page.expect_download() as dl: page.click('#downloadBtn')
    d = dl.value; f = f'{OUT}/card_result.png'; d.save_as(f)
    check('download card png', d.suggested_filename == 'lite-thesko-bro.png' and os.path.getsize(f) > 20000, f'{d.suggested_filename} {os.path.getsize(f)} bytes')

    with ctx.expect_page() as pop: page.click('#shareBtn')
    wa = pop.value; wa.wait_for_load_state()
    decoded = urllib.parse.unquote(wa.url)
    check('share opens wa.me with text', wa.url.startswith('https://wa.me/?text=') and q2 in decoded and 'litetheskobro.com' in decoded, wa.url[:70] + '…')
    wa.close()

    # manual chip override
    page.click('.chip[data-cat="love"]')
    check('manual chip clears detect hint', page.locator('#detected').inner_text() == '')
    page.click('#goBtn'); bg = card_bg(page); check('Prema chip -> pink card', bg == PINK, bg)
    ctr = page.locator('#counter').inner_text(); check('counter says 2', 'tensions: 2' in ctr, ctr)
    check('counter persisted', page.evaluate("localStorage.getItem('ltb-count')") == '2')

    # ctrl+enter + exams detection
    page.click('.chip[data-cat="auto"]')
    page.fill('#tension', 'Exam repu undi, syllabus poorthi avaledu, backlog bhayam')
    det = page.locator('#detected').inner_text(); check('auto-detect shows Exams', det == 'Detect ayindi: Exams', det)
    page.focus('#tension'); page.keyboard.press('Control+Enter')
    bg = card_bg(page); check('Ctrl+Enter submits -> green exams card', bg == GREEN, bg)

    # empty submit
    page.fill('#tension', ''); page.click('#goBtn')
    level = int(page.locator('#levelNum').inner_text()); bg = card_bg(page)
    check('empty submit -> general, level 4', level == 4 and bg == YELLOW, f'level {level}, {bg}')

    # daily + meme downloads
    with page.expect_download() as dl: page.click('#dailyDownload')
    f = f'{OUT}/card_daily.png'; dl.value.save_as(f); check('daily card download', os.path.getsize(f) > 20000, f'{os.path.getsize(f)} bytes')
    with page.expect_download() as dl: page.locator('#memeGrid .meme button').first.click()
    f = f'{OUT}/card_meme.png'; dl.value.save_as(f); check('meme card download', os.path.getsize(f) > 20000, f'{os.path.getsize(f)} bytes')

    # detection unit checks through the hook
    for text, exp in [('crush reply ivvaledu bro', 'love'), ('month end dabbu ledu', 'money'), ('amma pelli eppudu antundi', 'family'),
                      ('gachibowli traffic lo irukkupoya', 'hyd'), ('india odipoyindi last over lo', 'cricket'),
                      ('friend late ayyadu goa plan cancel', 'friends'), ('life boring ga undi', 'general'), ('boss deadline ichadu salary raaledu', 'office')]:
        got = page.evaluate('t => window.__ltb.detect(t)', text); check(f'detect -> {exp}', got == exp, f'{text!r} -> {got}')
    lv = page.evaluate("t => window.__ltb.level(t)", 'CHALA TENSION BRO!!! HELP PLEASE ' * 3); check('shouty long text -> high level', lv >= 8, lv)
    lv = page.evaluate("t => window.__ltb.level(t)", 'oka chinna doubt'); check('short calm text -> low level', lv <= 3, lv)

    # anchors + links
    for a in ['#cheppu', '#daily', '#memes', '#store']:
        check(f'nav target {a} exists', page.locator(a).count() == 1)
    check('mailto links present', page.locator('a[href^="mailto:hello@litetheskobro.com"]').count() == 2)
    check('no console/page errors', not errors, errors[:3])

    # 404
    page.goto(BASE + '/404.html'); page.wait_for_load_state('networkidle')
    check('404 title', page.title().startswith('404'), page.title())
    check('404 styled (yellow)', page.evaluate("getComputedStyle(document.querySelector('.oops')).backgroundColor") == YELLOW)
    page.screenshot(path=f'{OUT}/404.png')
    ctx.close()

    # ------------------------------------------------------------ mobile (iPhone-ish)
    mctx = browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=3, is_mobile=True, has_touch=True, accept_downloads=True,
                               user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1')
    mctx.route('https://wa.me/**', wa_stub)
    mctx.add_init_script("""
      Object.defineProperty(navigator, 'userAgentData', { value: { mobile: true }, configurable: true });
      navigator.canShare = () => true;
      navigator.share = (data) => { window.__shared = { files: (data.files || []).length, text: data.text || '', type: data.files && data.files[0] && data.files[0].type }; return Promise.resolve(); };
    """)
    m = mctx.new_page(); merr = []
    m.on('pageerror', lambda e: merr.append(str(e)))
    m.goto(BASE + '/'); m.wait_for_load_state('networkidle'); m.evaluate('document.fonts.ready')
    sw, iw = m.evaluate('[document.documentElement.scrollWidth, window.innerWidth]')
    check('mobile: no horizontal overflow', sw <= iw + 1, f'scrollWidth {sw} vs viewport {iw}')
    check('mobile: nav hidden, CTA visible', m.locator('.top nav').is_hidden() and m.locator('.top .btn.small').is_visible())
    m.fill('#tension', 'crush reply ivvaledu, 3 rojulu ayindi bro'); m.tap('#goBtn'); m.wait_for_selector('#result:not([hidden])')
    bg = card_bg(m); check('mobile: love -> pink card', bg == PINK, bg)
    m.tap('#shareBtn'); m.wait_for_function('window.__shared !== undefined')
    shared = m.evaluate('window.__shared')
    check('mobile: native share gets 1 PNG + text', shared['files'] == 1 and shared['type'] == 'image/png' and 'litetheskobro.com' in shared['text'], shared)
    m.tap('#dailyShare'); m.wait_for_function("window.__shared && window.__shared.text.includes('Lite thesko bro')")
    check('mobile: daily share works', True)
    m.screenshot(path=f'{OUT}/mobile.png', full_page=True)
    check('mobile: no page errors', not merr, merr[:2])
    mctx.close()

    # ------------------------------------------------------------ og image
    og = open(os.path.join(TESTS, 'og.html')).read().replace('__BASE__', BASE); open(f'{OUT}/og.html', 'w').write(og)
    octx = browser.new_context(viewport={'width': 1200, 'height': 630}); o = octx.new_page()
    o.goto('file://' + f'{OUT}/og.html'); o.wait_for_load_state('networkidle'); o.evaluate('document.fonts.ready')
    o.screenshot(path=f'{SITE}/og.png'); check('og.png written', os.path.getsize(f'{SITE}/og.png') > 20000)
    octx.close(); browser.close()

srv.shutdown()
fails = [n for n, ok in results if not ok]
print(f'\n{len(results) - len(fails)}/{len(results)} checks passed' + (f'; FAILED: {fails}' if fails else ''))
sys.exit(1 if fails else 0)

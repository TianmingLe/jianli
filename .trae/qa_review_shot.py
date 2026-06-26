from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 900})
    page = context.new_page()

    page.goto('http://localhost:5175/qa', wait_until='networkidle')
    page.wait_for_timeout(2000)

    # full page screenshot
    page.screenshot(path='/workspace/.trae/qa_review_full.png', full_page=True)

    # viewport-only screenshot (top)
    page.screenshot(path='/workspace/.trae/qa_review_top.png', full_page=False)

    # scroll to bottom BlurText
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1500)
    page.screenshot(path='/workspace/.trae/qa_review_bottom.png', full_page=False)

    # scroll back to middle
    page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.4)")
    page.wait_for_timeout(1000)
    page.screenshot(path='/workspace/.trae/qa_review_middle.png', full_page=False)

    browser.close()
    print("done")

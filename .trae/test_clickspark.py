from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 900})
    page = context.new_page()

    page.goto('http://localhost:5176/', wait_until='networkidle')
    page.wait_for_timeout(3000)

    # 截图：点击前
    page.screenshot(path='/workspace/.trae/spark_before.png', full_page=False)

    # 在页面中部点击
    page.mouse.click(720, 450)
    page.wait_for_timeout(200)

    # 截图：点击后（火花动画中）
    page.screenshot(path='/workspace/.trae/spark_after.png', full_page=False)

    # 再点击几个位置
    page.mouse.click(400, 300)
    page.wait_for_timeout(100)
    page.mouse.click(1000, 600)
    page.wait_for_timeout(100)
    page.screenshot(path='/workspace/.trae/spark_multi.png', full_page=False)

    browser.close()
    print("done")

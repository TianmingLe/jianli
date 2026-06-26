from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 900})
    page = context.new_page()

    errors = []
    page.on('console', lambda msg: errors.append(f"[{msg.type}] {msg.text}") if msg.type in ('error', 'warning') else None)

    page.goto('http://localhost:5173/qa', wait_until='networkidle')
    page.wait_for_timeout(1500)

    page.screenshot(path='/workspace/.trae/qa_static.png', full_page=False)

    card = page.locator('.border-glow-card').first
    card.scroll_into_view_if_needed()
    page.wait_for_timeout(400)

    box = card.bounding_box()
    if box:
        cx = box['x'] + box['width'] / 2
        top_y = box['y'] + 6
        right_x = box['x'] + box['width'] - 6
        bottom_y = box['y'] + box['height'] - 6
        left_x = box['x'] + 6

        page.mouse.move(cx, top_y)
        page.wait_for_timeout(200)
        page.screenshot(path='/workspace/.trae/qa_glow_top.png', full_page=False)

        for i in range(1, 11):
            x = cx + (right_x - cx) * (i / 10)
            page.mouse.move(x, top_y)
            page.wait_for_timeout(40)
        page.screenshot(path='/workspace/.trae/qa_glow_topright.png', full_page=False)

        for i in range(1, 11):
            y = top_y + (bottom_y - top_y) * (i / 10)
            page.mouse.move(right_x, y)
            page.wait_for_timeout(40)
        page.screenshot(path='/workspace/.trae/qa_glow_right.png', full_page=False)

        for i in range(1, 11):
            x = right_x - (right_x - left_x) * (i / 10)
            page.mouse.move(x, bottom_y)
            page.wait_for_timeout(40)
        page.screenshot(path='/workspace/.trae/qa_glow_bottom.png', full_page=False)

        for i in range(1, 11):
            y = bottom_y - (bottom_y - top_y) * (i / 10)
            page.mouse.move(left_x, y)
            page.wait_for_timeout(40)
        page.screenshot(path='/workspace/.trae/qa_glow_left.png', full_page=False)

    page.mouse.move(720, 450)
    page.wait_for_timeout(800)
    page.screenshot(path='/workspace/.trae/qa_fullpage.png', full_page=True)

    print("=== CONSOLE ERRORS / WARNINGS ===")
    if errors:
        for e in errors[:30]:
            print(e)
    else:
        print("none")

    browser.close()

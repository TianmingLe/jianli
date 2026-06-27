from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto('http://localhost:5174/projects')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    # 滚动到评论区精选区域
    page.evaluate("""() => {
        const els = document.querySelectorAll('h3');
        for (const el of els) {
            if (el.textContent.includes('评论区精选')) {
                el.scrollIntoView({ block: 'center' });
                return true;
            }
        }
        return false;
    }""")
    page.wait_for_timeout(3000)

    # 截图整个视口
    page.screenshot(path='/workspace/diag_bounce.png')

    # 检查卡片状态
    info = page.evaluate("""() => {
        const container = document.querySelector('.bounceCardsContainer');
        if (!container) return { error: 'no bounceCardsContainer' };
        const cards = container.querySelectorAll('.card');
        const results = [];
        cards.forEach((c, i) => {
            const cs = window.getComputedStyle(c);
            const img = c.querySelector('.image');
            const imgCs = img ? window.getComputedStyle(img) : null;
            results.push({
                idx: i,
                transform: cs.transform,
                width: cs.width,
                height: cs.height,
                opacity: cs.opacity,
                display: cs.display,
                imgSrc: img ? img.src.slice(-40) : null,
                imgObjectFit: imgCs ? imgCs.objectFit : null,
                imgComplete: img ? img.complete : null,
                imgNaturalWidth: img ? img.naturalWidth : null,
            });
        });
        return { containerRect: container.getBoundingClientRect(), cards: results };
    }""")
    print(json.dumps(info, indent=2, default=str))

    browser.close()

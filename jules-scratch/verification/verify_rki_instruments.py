
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:3000/dashboard")
        page.wait_for_selector('a[href="/rki-instruments"]')
        page.click('a[href="/rki-instruments"]')

        # Wait for an element that is unique to the RKI Instruments page to ensure it's loaded
        page.wait_for_selector('h1:has-text("RKI Instruments, Inc.")')

        page.screenshot(path="jules-scratch/verification/rki-instruments-invoice.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)

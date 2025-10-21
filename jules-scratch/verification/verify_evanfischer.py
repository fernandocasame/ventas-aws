from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the login page first
    page.goto("http://localhost:3000")

    # Fill in the credentials and login
    page.get_by_label("Email address").fill("user@example.com")
    page.get_by_label("Password").fill("password")
    page.get_by_role("button", name="Sign in").click()

    # Wait for navigation to the dashboard
    page.wait_for_url("http://localhost:3000/dashboard")

    # Click the link to the Evan Fischer invoice
    page.get_by_role("link", name="Evan Fischer Invoice").click()

    # Wait for the invoice page to load
    page.wait_for_url("http://localhost:3000/evanfischer")

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/evanfischer_screenshot.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
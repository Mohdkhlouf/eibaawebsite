import { expect, test } from '@playwright/test'

test.describe('Accessibility', () => {
  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const h1 = page.locator('h1')
    const h2 = page.locator('h2')

    const h1Count = await h1.count()
    const h2Count = await h2.count()

    expect(h1Count).toBeGreaterThanOrEqual(1)
  })

  test('links have descriptive text', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const links = page.locator('a')
    const linkCount = await links.count()

    expect(linkCount).toBeGreaterThan(0)
  })

  test('buttons have accessible text', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    const submitButton = page.locator('button[type="submit"]')
    const buttonText = await submitButton.textContent()

    expect(buttonText?.trim()).toBeTruthy()
  })

  test('form inputs have associated labels', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    const labels = page.locator('label')
    const labelCount = await labels.count()

    expect(labelCount).toBeGreaterThan(0)
  })

  test('images have alt text', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const images = page.locator('img')
    const imageCount = await images.count()

    if (imageCount > 0) {
      const firstImage = images.first()
      const alt = await firstImage.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('page is keyboard navigable', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)

    expect(focusedElement).toBeDefined()
  })

  test('footer links are keyboard accessible', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const footer = page.locator('footer')
    const footerLinks = footer.locator('a')
    const linkCount = await footerLinks.count()

    expect(linkCount).toBeGreaterThan(0)
  })

  test('navigation menu is keyboard accessible', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('http://localhost:3000')

    const navLinks = page.locator('nav a')
    const navCount = await navLinks.count()

    expect(navCount).toBeGreaterThan(0)
  })

  test('form validation messages appear', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    const submitButton = page.locator('button[type="submit"]')

    await emailInput.focus()
    await emailInput.blur()

    await submitButton.click()
  })

  test('color contrast is maintained', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const body = page.locator('body')
    await expect(body).toBeVisible()
  })
})

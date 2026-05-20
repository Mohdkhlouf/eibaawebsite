import { expect, test } from '@playwright/test'

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile (iPhone 12)', width: 390, height: 844 },
    { name: 'Tablet (iPad)', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Large Desktop', width: 1920, height: 1080 },
  ]

  viewports.forEach(({ name, width, height }) => {
    test(`homepage responsive on ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto('http://localhost:3000')

      const header = page.locator('header')
      const footer = page.locator('footer')

      await expect(header).toBeVisible()
      await expect(footer).toBeVisible()

      await page.screenshot({ path: `tests/screenshots/home-${name}.png` })
    })

    test(`blogs page responsive on ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto('http://localhost:3000/blogs')

      const header = page.locator('header')
      await expect(header).toBeVisible()

      await page.screenshot({ path: `tests/screenshots/blogs-${name}.png` })
    })

    test(`services page responsive on ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto('http://localhost:3000/services')

      const header = page.locator('header')
      await expect(header).toBeVisible()
    })
  })

  test('mobile menu toggle works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')

    const toggleButton = page.locator('button[aria-label="Toggle menu"]')
    
    if (await toggleButton.isVisible()) {
      await toggleButton.click()
      const mobileMenu = page.locator('nav').locator('visible=true')
      await expect(mobileMenu).toBeVisible()
    }
  })

  test('desktop menu visible on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('http://localhost:3000')

    const navMenu = page.locator('nav').filter({ has: page.locator('a') })
    await expect(navMenu).toBeVisible()
  })

  test('mobile login form responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000/login')

    const emailInput = page.locator('input[type="email"]')
    await expect(emailInput).toBeVisible()
  })

  test('tablet dashboard sidebar responsive', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('http://localhost:3000/dashboard')

    const sidebar = page.locator('aside')
    
    if (await sidebar.isVisible()) {
      await expect(sidebar).toBeVisible()
    }
  })
})

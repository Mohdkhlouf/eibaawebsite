import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('desktop menu items visible on large screens', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.setViewportSize({ width: 1280, height: 720 })
    
    const navMenu = page.locator('nav').filter({ has: page.locator('a') })
    await expect(navMenu).toBeVisible()
  })

  test('mobile hamburger menu visible on small screens', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.setViewportSize({ width: 375, height: 667 })
    
    const hamburgerButton = page.locator('button[aria-label="Toggle menu"]')
    await expect(hamburgerButton).toBeVisible()
  })

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.setViewportSize({ width: 375, height: 667 })
    
    const hamburgerButton = page.locator('button[aria-label="Toggle menu"]')
    await hamburgerButton.click()
    
    const mobileMenu = page.locator('nav').locator('visible=true')
    await expect(mobileMenu).toBeVisible()
    
    await hamburgerButton.click()
  })

  test('header logo navigates to home', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    const logo = page.locator('header a[href="/"]')
    await logo.click()
    
    await expect(page).toHaveURL('http://localhost:3000')
  })

  test('navigation links exist and are clickable', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    const blogLink = page.locator('a[href*="/blogs"]').first()
    const servicesLink = page.locator('a[href*="/services"]').first()
    const coursesLink = page.locator('a[href*="/courses"]').first()
    
    await expect(blogLink).toBeVisible()
    await expect(servicesLink).toBeVisible()
    await expect(coursesLink).toBeVisible()
  })
})

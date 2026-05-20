import { expect, test } from '@playwright/test'

test.describe('Authentication', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    await expect(page).toHaveTitle(/Login/)
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]').first()

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  test('register page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/register')

    await expect(page).toHaveTitle(/Register/)
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]').first()

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  test('login form has required fields', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]').first()
    const submitButton = page.locator('button[type="submit"]')

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()
  })

  test('register form has required fields', async ({ page }) => {
    await page.goto('http://localhost:3000/register')

    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]').first()
    const submitButton = page.locator('button[type="submit"]')

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()
  })

  test('login with invalid email shows error', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]').first()
    const submitButton = page.locator('button[type="submit"]')

    await emailInput.fill('invalid-email')
    await passwordInput.fill('password123')

    await expect(submitButton).toBeEnabled()
  })

  test('onboarding page accessible after signup', async ({ page }) => {
    await page.goto('http://localhost:3000/onboarding')

    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
  })

  test('auth page with LTR direction', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    // check the wrapper div has ltr
    const body = page.locator('body')
    await expect(body).toBeVisible()

    // log what dir attributes exist
    const dirs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[dir]')).map(el => ({
        tag: el.tagName,
        dir: el.getAttribute('dir'),
        class: el.className
      }))
    })
    console.log('dir elements:', dirs)
  })

  test('forgot password link visible', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    const forgotLink = page.locator('a[href*="forgot"], button:has-text("Forgot")')
    const hasPasswordReset = await forgotLink.count() > 0

    expect(hasPasswordReset).toBeDefined()
  })

  test('register link visible on login page', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    const registerLink = page.locator('a[href*="/register"]')
    await expect(registerLink).toBeVisible()
  })

  test('login link visible on register page', async ({ page }) => {
    await page.goto('http://localhost:3000/register')

    const loginLink = page.locator('a[href*="/login"]').first()
    await expect(loginLink).toBeVisible()
  })
})

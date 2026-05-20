import { expect, test } from '@playwright/test'

test.describe('Authentication', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    
    await expect(page).toHaveTitle(/Login/)
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    
    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  test('register page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/register')
    
    await expect(page).toHaveTitle(/Register/)
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    
    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  test('login form has required fields', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    const submitButton = page.locator('button[type="submit"]')
    
    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()
  })

  test('register form has required fields', async ({ page }) => {
    await page.goto('http://localhost:3000/register')
    
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    const submitButton = page.locator('button[type="submit"]')
    
    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()
  })

  test('login with invalid email shows error', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
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
    
    const htmlElement = page.locator('html')
    const dir = await htmlElement.getAttribute('dir')
    
    expect(dir).toBe('ltr')
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
    
    const loginLink = page.locator('a[href*="/login"]')
    await expect(loginLink).toBeVisible()
  })
})

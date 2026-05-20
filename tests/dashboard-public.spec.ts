import { expect, test } from '@playwright/test'

test('dashboard redirects to login when not authenticated', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard')
  await page.waitForURL(/login/)
  expect(page.url()).toContain('login')
})

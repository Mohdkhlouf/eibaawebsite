import { test as setup } from '@playwright/test'

setup('authenticate', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.locator('input[type="email"]').fill('admin@eibaa.net')
  await page.locator('input[type="password"]').fill('ABCD@123456')
  await page.locator('button[type="submit"]').click()
  await page.waitForURL('http://localhost:3000/dashboard')
  await page.context().storageState({ path: 'playwright/.auth/user.json' })
})

import { expect, test } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await expect(page).toHaveTitle(/موقع الاخصائية الأسرية إباء أبو طه/)
})

test('social links visible in footer', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const links = page.locator('footer a[aria-label]')
  await expect(links.first()).toBeVisible()
})

test('social links visible in header', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const links = page.locator('section a[aria-label]')
  await expect(links.first()).toBeVisible()
})

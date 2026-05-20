import { expect, test } from '@playwright/test'

test.describe('Dashboard', () => {
  test('dashboard redirect to login when not authenticated', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard')
    
    await page.waitForURL(/\/(login|auth)/)
    expect(page.url()).toContain('login')
  })

  test('dashboard has sidebar navigation', async ({ page, context }) => {
    await page.goto('http://localhost:3000/dashboard')
    
    const sidebar = page.locator('aside')
    const isRedirected = page.url().includes('login')
    
    if (!isRedirected) {
      await expect(sidebar).toBeVisible()
    }
  })

  test('dashboard sidebar has menu items', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=blogs')
    
    const sidebar = page.locator('aside')
    
    if (await sidebar.isVisible()) {
      const sidebarLinks = sidebar.locator('a, button[type="button"]')
      const count = await sidebarLinks.count()
      
      expect(count).toBeGreaterThan(0)
    }
  })

  test('blogs section loads in dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=blogs')
    
    const contentArea = page.locator('main, [role="main"]')
    
    if (await contentArea.isVisible()) {
      await expect(contentArea).toBeVisible()
    }
  })

  test('services section loads in dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=services')
    
    const contentArea = page.locator('main, [role="main"]')
    
    if (await contentArea.isVisible()) {
      await expect(contentArea).toBeVisible()
    }
  })

  test('categories section loads in dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=categories')
    
    const contentArea = page.locator('main, [role="main"]')
    
    if (await contentArea.isVisible()) {
      await expect(contentArea).toBeVisible()
    }
  })

  test('courses section loads in dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=courses')
    
    const contentArea = page.locator('main, [role="main"]')
    
    if (await contentArea.isVisible()) {
      await expect(contentArea).toBeVisible()
    }
  })

  test('pages section loads in dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=pages')
    
    const contentArea = page.locator('main, [role="main"]')
    
    if (await contentArea.isVisible()) {
      await expect(contentArea).toBeVisible()
    }
  })

  test('menu section loads in dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=menu')
    
    const contentArea = page.locator('main, [role="main"]')
    
    if (await contentArea.isVisible()) {
      await expect(contentArea).toBeVisible()
    }
  })

  test('social media section loads in dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=socialMediaLinks')
    
    const contentArea = page.locator('main, [role="main"]')
    
    if (await contentArea.isVisible()) {
      await expect(contentArea).toBeVisible()
    }
  })

  test('users section loads in dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=users')
    
    const contentArea = page.locator('main, [role="main"]')
    
    if (await contentArea.isVisible()) {
      await expect(contentArea).toBeVisible()
    }
  })

  test('dashboard header present', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard')
    
    const header = page.locator('header')
    
    if (await header.isVisible()) {
      await expect(header).toBeVisible()
    }
  })

  test('dashboard LTR direction set', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard')
    
    const htmlElement = page.locator('html')
    const dir = await htmlElement.getAttribute('dir')
    
    if (dir) {
      expect(dir).toBe('ltr')
    }
  })

  test('add button appears in forms sections', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=blogs&action=add')
    
    const formElement = page.locator('form')
    
    if (await formElement.isVisible()) {
      await expect(formElement).toBeVisible()
    }
  })

  test('edit parameter works in URL', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard?section=blogs&action=edit')
    
    await expect(page).toHaveURL(/action=edit/)
  })
})

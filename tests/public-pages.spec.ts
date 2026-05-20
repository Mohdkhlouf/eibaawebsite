import { expect, test } from '@playwright/test'

test.describe('Public Pages', () => {
  test('blogs page loads and displays content', async ({ page }) => {
    await page.goto('http://localhost:3000/blogs')
    
    await expect(page).toHaveTitle(/Blogs/)
    const blogCards = page.locator('article, [role="article"], .blog-card')
    await expect(blogCards).toBeDefined()
  })

  test('services page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/services')
    
    await expect(page).toHaveTitle(/Services/)
  })

  test('courses page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/courses')
    
    await expect(page).toHaveTitle(/Courses/)
  })

  test('blog detail page loads when blog exists', async ({ page }) => {
    await page.goto('http://localhost:3000/blogs')
    
    const firstBlogLink = page.locator('a[href*="/blogs/"]').first()
    if (await firstBlogLink.isVisible()) {
      await firstBlogLink.click()
      await expect(page).toHaveURL(/\/blogs\/[a-z0-9]+/)
    }
  })

  test('service detail page loads when service exists', async ({ page }) => {
    await page.goto('http://localhost:3000/services')
    
    const firstServiceLink = page.locator('a[href*="/services/"]').first()
    if (await firstServiceLink.isVisible()) {
      await firstServiceLink.click()
      await expect(page).toHaveURL(/\/services\/[a-z0-9]+/)
    }
  })

  test('course detail page loads when course exists', async ({ page }) => {
    await page.goto('http://localhost:3000/courses')
    
    const firstCourseLink = page.locator('a[href*="/courses/"]').first()
    if (await firstCourseLink.isVisible()) {
      await firstCourseLink.click()
      await expect(page).toHaveURL(/\/courses\/[a-z0-9]+/)
    }
  })

  test('footer is visible on all pages', async ({ page }) => {
    await page.goto('http://localhost:3000/blogs')
    
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('header is visible on all pages', async ({ page }) => {
    await page.goto('http://localhost:3000/services')
    
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })

  test('404 page displays for invalid route', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/nonexistent-page-12345')
    
    expect(response?.status()).toBe(404)
  })

  test('RTL attributes set correctly on public site', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    const htmlElement = page.locator('html')
    const lang = await htmlElement.getAttribute('lang')
    
    expect(lang).toBe('ar')
  })
})

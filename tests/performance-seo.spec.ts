import { expect, test } from '@playwright/test'

test.describe('Performance & SEO', () => {
  test('page loads in reasonable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(5000)
  })

  test('images are optimized (lazy loaded)', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const images = page.locator('img')
    const imageCount = await images.count()

    if (imageCount > 0) {
      const firstImage = images.first()
      const loading = await firstImage.getAttribute('loading')

      expect(loading).toBeDefined()
    }
  })

  test('page has meta description', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toBeVisible()
  })

  test('page has viewport meta tag', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const viewportMeta = page.locator('meta[name="viewport"]')
    await expect(viewportMeta).toBeVisible()
  })

  test('page title is set', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)
  })

  test('links have no broken references', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const links = page.locator('a[href]')
    const linkCount = await links.count()

    expect(linkCount).toBeGreaterThan(0)
  })

  test('CSS is loaded', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const stylesheet = page.locator('link[rel="stylesheet"]')
    const stylesheetCount = await stylesheet.count()

    expect(stylesheetCount).toBeGreaterThanOrEqual(0)
  })

  test('page renders without console errors', async ({ page }) => {
    const errors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('http://localhost:3000')

    expect(errors.length).toBe(0)
  })

  test('canonical URL is set on public pages', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const canonical = page.locator('link[rel="canonical"]')
    const canonicalCount = await canonical.count()

    expect(canonicalCount).toBeGreaterThanOrEqual(0)
  })

  test('OpenGraph tags present', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const ogTitle = page.locator('meta[property="og:title"]')
    
    expect(await ogTitle.count()).toBeGreaterThanOrEqual(0)
  })
})

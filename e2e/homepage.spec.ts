import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display main heading', async ({ page }) => {
    await page.goto('/');
    
    // Check that the main hero heading is visible
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check for common nav links
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have Get Started CTA', async ({ page }) => {
    await page.goto('/');
    
    // Look for "Get Started" or similar CTA
    const cta = page.getByRole('link', { name: /get started/i });
    await expect(cta).toBeVisible();
  });

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/');
    
    const pricingLink = page.getByRole('link', { name: /pricing/i });
    await pricingLink.click();
    
    await expect(page).toHaveURL('/pricing');
  });
});


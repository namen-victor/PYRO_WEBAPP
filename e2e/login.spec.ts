import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/login|sign in/i);
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test('should show validation error for empty email', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /login|sign in/i });
    await submitButton.click();
    
    // Expect validation message or disabled submit
    await expect(page.getByLabel(/email/i)).toBeFocused();
  });

  test('should have Google sign-in option', async ({ page }) => {
    const googleButton = page.getByRole('button', { name: /google/i });
    await expect(googleButton).toBeVisible();
  });

  test('should navigate to signup page', async ({ page }) => {
    const signupLink = page.getByRole('link', { name: /sign up|create account/i });
    await signupLink.click();
    
    await expect(page).toHaveURL('/signup');
  });
});


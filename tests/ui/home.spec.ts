import { test, expect } from '@playwright/test';

test('displays the homepage', async ({ page }) => {
  await page.goto('https://automationintesting.online/');

  await expect(page.getByRole('heading', {
    name: 'Welcome to Shady Meadows B&B'
  })).toBeVisible();
});
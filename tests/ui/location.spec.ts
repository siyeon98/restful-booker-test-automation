import { test, expect } from '@playwright/test';

test('displays correct location contact information', async ({ page }) => {
  await page.goto('https://automationintesting.online/#location');

  const locationSection = page.locator('#location');

  const expectedContactInfo = {
    Address: 'Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA',
    Phone: '012345678901',
    Email: 'fake@fakeemail.com'
  };

  for (const [field, expectedText] of Object.entries(expectedContactInfo)) {
    const value = locationSection
      .getByRole('heading', { name: field, exact: true })
      .locator('..')
      .locator('p');

    await expect(value).toHaveText(expectedText);
  }
});
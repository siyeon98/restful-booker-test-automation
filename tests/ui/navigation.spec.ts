import { test, expect } from '@playwright/test';

test('navigates to Rooms section from navigation menu', async ({ page }) => {
    await page.goto('https://automationintesting.online/');

    await page.locator('#navbarNav')
        .getByRole('link', { name: 'Rooms', exact: true })
        .click();

    await expect(page).toHaveURL(/#rooms$/);

    await expect(
        page.getByRole('heading', { name: 'Our Rooms' })
    ).toBeInViewport();
})

test('navigates to Booking section from navigation menu', async ({ page }) => {
  await page.goto('https://automationintesting.online/');

  await page.locator('#navbarNav')
    .getByRole('link', { name: 'Booking', exact: true })
    .click();

  await expect(page).toHaveURL(/#booking$/);

  await expect(
    page.getByRole('heading', {
      name: 'Check Availability & Book Your Stay'
    })
  ).toBeInViewport();
});

test.fixme('navigates to Amenities section from navigation menu', async ({ page }) => {
  await page.goto('https://automationintesting.online/');

  await page.locator('#navbarNav')
    .getByRole('link', { name: 'Amenities', exact: true })
    .click();

  await expect(page).toHaveURL(/#amenities$/);

  await expect(page.locator('#amenities')).toBeInViewport();
});

test('navigates to Location section from navigation menu', async ({ page }) => {
  await page.goto('https://automationintesting.online/');

  await page.locator('#navbarNav')
    .getByRole('link', { name: 'Location', exact: true })
    .click();

  await expect(page).toHaveURL(/#location$/);

  await expect(
    page.getByRole('heading', { name: 'Our Location' })
  ).toBeInViewport();
});

test('navigates to Contact section from navigation menu', async ({ page }) => {
  await page.goto('https://automationintesting.online/');

  await page.locator('#navbarNav')
    .getByRole('link', { name: 'Contact', exact: true })
    .click();

  await expect(page).toHaveURL(/#contact$/);

  await expect(
    page.getByRole('heading', { name: 'Send Us a Message' })
  ).toBeInViewport();
});

test('navigates to Admin login page from navigation menu', async ({ page }) => {
  await page.goto('https://automationintesting.online/');

  await page.locator('#navbarNav')
    .getByRole('link', { name: 'Admin', exact: true })
    .click();

  await expect(page).toHaveURL('https://automationintesting.online/admin');

  await expect(
    page.getByRole('heading', { name: 'Login', exact: true })
  ).toBeVisible();
});
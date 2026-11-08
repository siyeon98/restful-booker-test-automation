import { test, expect, type Page } from "@playwright/test";

async function loginAsAdmin(page: Page) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("Admin credentials are missing");
  }

  await page.goto("https://automationintesting.online/admin");
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
}

test("admin can log in with valid credentials", async ({ page }) => {
  await loginAsAdmin(page);

  await expect(page).toHaveURL(/\/admin\/rooms\/?$/);
});

test("admin can log out successfully", async ({ page }) => {
  await loginAsAdmin(page);

  await expect(page).toHaveURL(/\/admin\/rooms\/?$/);

  await page.getByRole("button", { name: "Logout" }).click();

  await expect(page).toHaveURL("https://automationintesting.online/");
});

test("admin cannot log in with invalid credentials", async ({ page }) => {
  await page.goto("https://automationintesting.online/admin");

  await page.getByLabel("Username").fill("invalid_user");
  await page.getByLabel("Password").fill("wrong_password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Invalid credentials")).toBeVisible();
});

test("admin cannot access protected page after logout", async ({ page }) => {
  await loginAsAdmin(page);

  await expect(page).toHaveURL(/\/admin\/rooms\/?$/);

  await page.getByRole("button", { name: "Logout" }).click();

  await expect(page).toHaveURL("https://automationintesting.online/");

  await page.goto("https://automationintesting.online/admin/rooms");

  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

test("admin cannot log in with empty credentials", async ({ page }) => {
  await page.goto("https://automationintesting.online/admin");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Invalid credentials")).toBeVisible();
});
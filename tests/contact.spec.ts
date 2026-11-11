import { test, expect, type Page } from "@playwright/test";

type ContactData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

// Keep other fields valid to isolate each validation rule.
async function fillContactForm(page: Page, overrides: Partial<ContactData>) {
  const data = {
    name: "QA",
    email: "qa.test@example.com",
    phone: "01012345678",
    subject: "Contact validation test",
    message: "This message is for contact form validation.",
    ...overrides,
  };

  await page.getByRole("textbox", { name: "Name" }).fill(data.name);
  await page.getByRole("textbox", { name: "Email" }).fill(data.email);
  await page.getByRole("textbox", { name: "Phone" }).fill(data.phone);
  await page.getByRole("textbox", { name: "Subject" }).fill(data.subject);
  await page.locator("textarea").fill(data.message);
}

test("shows required field errors when submitting an empty contact form", async ({
  page,
}) => {
  await page.goto("https://automationintesting.online/#contact");

  await page.getByRole("button", { name: "Submit" }).click();

  const expectedErrors = [
    "Message must be between 20 and 2000 characters.",
    "Email may not be blank",
    "Message may not be blank",
    "Phone must be between 11 and 21 characters.",
    "Phone may not be blank",
    "Subject must be between 5 and 100 characters.",
    "Subject may not be blank",
    "Name may not be blank",
  ];

  for (const error of expectedErrors) {
    await expect(page.getByText(error, { exact: true })).toBeVisible();
  }
});

test("shows validation error for invalid email", async ({ page }) => {
  await page.goto("https://automationintesting.online/#contact");

  await fillContactForm(page, {
    email: "invalid-email",
  });

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("must be a well-formed email address"),
  ).toBeVisible();
});

const phoneCases = [
  { phone: "0101234567", valid: false }, // 10: below minimum
  { phone: "01012345678", valid: true }, // 11: minimum
  { phone: "012345678901234567890", valid: true }, // 21: maximum
  { phone: "0123456789012345678901", valid: false }, // 22: above maximum
];

for (const phoneCase of phoneCases) {
  test(`validates phone with ${phoneCase.phone.length} characters`, async ({
    page,
  }) => {
    await page.goto("https://automationintesting.online/#contact");

    await fillContactForm(page, {
      phone: phoneCase.phone,
    });

    await page.getByRole("button", { name: "Submit" }).click();

    if (phoneCase.valid) {
      await expect(
        page.getByText("Thanks for getting in touch QA!"),
      ).toBeVisible();
    } else {
      await expect(
        page.getByText("Phone must be between 11 and 21 characters."),
      ).toBeVisible();
    }
  });
}

// Boundary values: just below minimum, minimum, maximum, just above maximum.
const subjectCases = [
  { length: 4, valid: false },
  { length: 5, valid: true },
  { length: 100, valid: true },
  { length: 101, valid: false },
];

for (const subjectCase of subjectCases) {
  test(`validates subject with ${subjectCase.length} characters`, async ({
    page,
  }) => {
    await page.goto("https://automationintesting.online/#contact");

    await fillContactForm(page, {
      subject: "A".repeat(subjectCase.length),
    });

    await page.getByRole("button", { name: "Submit" }).click();

    if (subjectCase.valid) {
      await expect(
        page.getByText("Thanks for getting in touch QA!"),
      ).toBeVisible();
    } else {
      await expect(
        page.getByText("Subject must be between 5 and 100 characters."),
      ).toBeVisible();
    }
  });
}

// Boundary values: just below minimum, minimum, maximum, just above maximum.
const messageCases = [
  { length: 19, valid: false },
  { length: 20, valid: true },
  { length: 2000, valid: true },
  { length: 2001, valid: false },
];

for (const messageCase of messageCases) {
  test(`validates message with ${messageCase.length} characters`, async ({
    page,
  }) => {
    await page.goto("https://automationintesting.online/#contact");

    await fillContactForm(page, {
      message: "A".repeat(messageCase.length),
    });

    await page.getByRole("button", { name: "Submit" }).click();

    if (messageCase.valid) {
      await expect(
        page.getByText("Thanks for getting in touch QA!"),
      ).toBeVisible();
    } else {
      await expect(
        page.getByText("Message must be between 20 and 2000 characters."),
      ).toBeVisible();
    }
  });
}

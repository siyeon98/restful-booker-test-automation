# Restful Booker Test Automation

A QA automation portfolio project for the [Restful Booker Platform](https://automationintesting.online/), using Playwright and TypeScript.

The project focuses on automated UI testing of core user-facing features and admin authentication, including homepage checks, room information, booking navigation, contact form validation, navigation menu behavior, and login/logout workflows.

## Tech Stack

- Playwright
- TypeScript
- Node.js / npm
- dotenv
- Prettier
- Git / GitHub

## Test Coverage

| Area | Tests | Coverage |
| --- | ---: | --- |
| Homepage | 1 | Homepage smoke testing |
| Room / Booking | 7 | Room information and booking navigation |
| Contact Form | 14 | Required fields, email validation, and input boundaries |
| Navigation | 6 | Rooms, Booking, Amenities, Location, Contact, and Admin navigation |
| Location | 1 | Address, phone number, and email content verification |
| Admin Authentication | 5 | Valid login, logout, invalid credentials, post-logout access restriction, and empty credentials |
| **Total** | **34** | **33 active tests, 1 marked as `test.fixme()`** |

The test suite runs across Chromium, Firefox, and WebKit.

**Latest full cross-browser regression run:**

- 99 passed
- 3 skipped
- 0 failed
- Execution time: 44.6 seconds

The three skipped executions correspond to the known Amenities navigation issue marked with `test.fixme()`.

### Testing Techniques

- Positive and negative testing
- Boundary Value Analysis
- Data-driven testing
- Reusable test helpers
- Playwright locators and assertions
- Cross-browser testing
- Defect reproduction and known-issue tracking
- Authentication workflow testing

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
git clone https://github.com/siyeon98/restful-booker-test-automation.git
cd restful-booker-test-automation
npm install
npx playwright install
```

### Admin Test Configuration

Admin authentication tests read credentials from environment variables.

Create a `.env` file in the project root:

```dotenv
ADMIN_USERNAME=<demo-admin-username>
ADMIN_PASSWORD=<demo-admin-password>
```

Use the credentials provided by the public demo application.

The `.env` file is excluded from Git tracking to avoid committing credentials.

## Running Tests

Run the full test suite:

```bash
npx playwright test
```

Run Admin Authentication tests in Chromium:

```bash
npx playwright test tests/ui/admin.spec.ts --project=chromium
```

View the HTML test report:

```bash
npx playwright show-report
```

## Troubleshooting

### Admin Logout Test Timing

**Observed issue:** The automated logout test failed when Logout was clicked immediately after the login helper, although manual logout worked.

**Change:** Added a Playwright URL assertion to wait for navigation to the Admin Rooms page before clicking Logout.

```ts
await expect(page).toHaveURL(/\/admin\/rooms\/?$/);
```

**Verification:** The logout test passed five consecutive repetitions, and the Admin Authentication test suite passed in Chromium. The subsequent full cross-browser regression run completed with 99 passed, 3 skipped, and 0 failed.

**Remaining uncertainty:** The exact root cause was not conclusively established. The test should continue to be monitored for intermittent failures.

## Known Limitations

- **Amenities navigation:** Clicking the Amenities menu changes the URL to `#amenities`, but the page does not scroll to a corresponding section. The observed page DOM does not contain an element with `id="amenities"`. This issue was reproduced in Chromium, Firefox, and WebKit. The regression test is retained and marked with `test.fixme()` until the issue is resolved.
- **Booking completion:** Completed booking workflows are not covered. The demo booking page has previously remained in a loading state, and a room API request returned HTTP 500.
- **Admin access restriction:** The post-logout test verifies the login UI after attempting to revisit a protected page. It does not independently verify server-side authorization.
- **Public demo environment:** Application behavior and availability may change.
- **Contact form submissions:** Valid contact form tests submit messages to the demo application. Repeated execution may create additional demo data.
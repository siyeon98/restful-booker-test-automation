# Restful Booker UI Test Automation

Automated UI testing for the [Restful Booker Platform](https://automationintesting.online/) using **Playwright and TypeScript**.

The project validates room information, navigation, contact form behavior, and admin authentication across **Chromium, Firefox, and WebKit**, with automated execution through GitHub Actions.

## Tech Stack

| Category | Technologies |
| --- | --- |
| Test Automation | Playwright, TypeScript |
| Runtime | Node.js, npm |
| Configuration | dotenv |
| Code Formatting | Prettier |
| CI/CD | GitHub Actions |
| Version Control | Git, GitHub |

## Test Coverage

| Area | Tests | Coverage |
| --- | ---: | --- |
| Homepage | 1 | Homepage smoke testing |
| Rooms & Booking | 7 | Room information, pricing, and reservation page navigation |
| Contact Form | 14 | Required fields, email validation, and input length boundaries |
| Navigation | 6 | Rooms, Booking, Amenities, Location, Contact, and Admin navigation |
| Location | 1 | Address, phone number, and email verification |
| Admin Authentication | 5 | Valid and invalid login, logout, empty credentials, and post-logout access checks |
| **Total** | **34** | **33 active tests, 1 marked as `test.fixme()`** |

### Verified Test Results

The latest verified full local regression run across three browsers completed with:

| Metric | Result |
| --- | --- |
| Passed | **99** |
| Failed | **0** |
| Skipped | **3** |
| Execution time | 46.0 seconds |

The three skipped executions correspond to the Amenities navigation test marked with `test.fixme()`.

## Test Design & Implementation

- **Positive and negative testing:** Valid and invalid inputs for authentication and contact form behavior.
- **Boundary Value Analysis:** Phone, subject, and message field lengths tested around their validation limits.
- **Parameterized tests:** Reusable test scenarios for room information and form validation.
- **Reusable helpers:** Shared setup for admin login and contact form inputs.
- **Cross-browser execution:** The same test suite runs against Chromium, Firefox, and WebKit.
- **Playwright assertions:** Verifies page content, navigation, visibility, and validation feedback.

The suite is organized by application feature to keep tests readable and maintainable.

## Project Structure

```text
restful-booker-ui-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── tests/
│   ├── admin.spec.ts
│   ├── contact.spec.ts
│   ├── home.spec.ts
│   ├── location.spec.ts
│   ├── navigation.spec.ts
│   └── rooms.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

A local `.env` file stores admin test credentials and is excluded from version control.

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
git clone https://github.com/siyeon98/restful-booker-ui-automation.git
cd restful-booker-ui-automation
npm ci
npx playwright install
```

### Environment Configuration

Create a `.env` file in the project root:

```dotenv
ADMIN_USERNAME=<demo-admin-username>
ADMIN_PASSWORD=<demo-admin-password>
```

Replace the placeholders with credentials provided by the demo application.

The `.env` file is ignored by Git. Do not commit credentials to the repository.

## Running Tests

Run the full suite:

```bash
npm test
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

Run a specific test file:

```bash
npx playwright test tests/admin.spec.ts --project=chromium
```

Open the HTML report:

```bash
npx playwright show-report
```

### Test Configuration

The Playwright configuration includes:

- Parallel test execution (`fullyParallel: true`)
- Chromium, Firefox, and WebKit projects
- No retries for local execution
- Two retries and one worker in CI
- HTML reporting
- Trace collection on the first retry

## Continuous Integration

GitHub Actions runs the Playwright test suite on a GitHub-hosted Ubuntu runner.

**Execution triggers:**

- Push to `main` or `master`
- Pull requests targeting `main` or `master`

**Workflow steps:**

1. Check out the repository.
2. Set up the latest Node.js LTS version.
3. Install dependencies using `npm ci`.
4. Install Playwright browsers and required system dependencies.
5. Execute the Playwright test suite.
6. Upload the HTML report as a workflow artifact.

Admin credentials are supplied through GitHub Actions repository secrets.

**Reporting:**

- Artifact: `playwright-report`
- Retention: 30 days
- Upload attempted unless the workflow is cancelled

The GitHub Actions workflow was verified to complete successfully after the previous test and documentation updates.

[View GitHub Actions runs](https://github.com/siyeon98/restful-booker-ui-automation/actions)

## Known Limitations

- **Amenities navigation:** The link updates the URL to `#amenities`, but the corresponding section is absent from the observed page DOM. The test is retained as `test.fixme()`.
- **Booking completion:** Full booking completion is not covered. Previous investigation encountered a loading issue and an HTTP 500 response from a room API request.
- **Admin authorization:** The post-logout test verifies the displayed login UI, not server-side authorization.
- **Public demo environment:** Application behavior and availability may change, potentially affecting test stability.
- **Contact form submissions:** Valid submission tests may create additional data in the public demo environment.

## Troubleshooting

### Admin Logout Timing

**Issue:** The automated logout test intermittently failed when attempting to log out immediately after login, although manual logout worked.

**Action:** Added a URL assertion to verify navigation to the Admin Rooms page before proceeding.

```ts
await expect(page).toHaveURL(/\/admin\/rooms\/?$/);
```

**Verification:** The logout test passed five consecutive repetitions. The exact root cause was not conclusively established.

## Security

- Local admin credentials are stored in a Git-ignored `.env` file.
- CI credentials are provided through GitHub Actions Secrets.
- Credentials are not hardcoded in test files.
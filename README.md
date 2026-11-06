# Restful Booker Test Automation

A QA automation portfolio project for the [Restful Booker Platform](https://automationintesting.online/), using Playwright and TypeScript.

The project focuses on automated UI testing of core user-facing features, including homepage checks, room information, booking navigation, contact form validation, and navigation menu behavior.

## Tech Stack

- Playwright
- TypeScript
- Node.js / npm
- Git / GitHub

## Test Coverage

| Area | Tests | Coverage |
| --- | ---: | --- |
| Homepage | 1 | Homepage smoke testing |
| Room / Booking | 7 | Room information and booking navigation |
| Contact Form | 14 | Required fields, email validation, and input boundaries |
| Navigation | 6 | Rooms, Booking, Amenities, Location, Contact, and Admin navigation |
| **Total** | **28** | **27 active tests, 1 marked as `test.fixme()`** |

The test suite runs across Chromium, Firefox, and WebKit.

**Latest local UI test run:**
- 81 passed
- 3 skipped
- 0 failed

The skipped tests correspond to the known Amenities navigation issue, marked with `test.fixme()`.

### Testing Techniques

- Positive and negative testing
- Boundary Value Analysis
- Data-driven testing
- Reusable test helpers
- Playwright locators and assertions
- Cross-browser testing
- Defect reproduction and known-issue tracking

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

## Running Tests

Run the test suite using the Playwright configuration:

```bash
npx playwright test
```

View the HTML test report:

```bash
npx playwright show-report
```

## Known Limitations

- **Amenities navigation:** Clicking the Amenities menu changes the URL to `#amenities`, but the page does not scroll to a corresponding section. The observed page DOM does not contain an element with `id="amenities"`. This issue was reproduced in Chromium, Firefox, and WebKit. The regression test is retained and marked with `test.fixme()` until the issue is resolved.
- **Booking completion:** Completed booking workflows are not covered. The demo booking page has previously remained in a loading state, and a room API request returned HTTP 500.
- **Public demo environment:** Application behavior and availability may change.
- **Contact form submissions:** Valid contact form tests submit messages to the demo application. Repeated execution may create additional demo data.
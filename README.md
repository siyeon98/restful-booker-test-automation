
# Restful Booker Test Automation

A QA automation portfolio project for the [Restful Booker Platform](https://automationintesting.online/), using Playwright and TypeScript.

The project focuses on automated UI testing of core user-facing features, including homepage checks, room information, booking navigation, and contact form validation.

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
| **Total** | **22** | |

### Testing Techniques

- Positive and negative testing
- Boundary Value Analysis
- Data-driven testing
- Reusable test helpers
- Playwright locators and assertions

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

- Completed booking workflows are not covered. The demo booking page has previously remained in a loading state, and a room API request returned HTTP 500.
- The application is a public demo environment, so its behavior and availability may change.
- Valid contact form tests submit messages to the demo application. Repeated execution may create additional demo data.
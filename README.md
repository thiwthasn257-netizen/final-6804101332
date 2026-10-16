# SauceDemo Playwright Final Exam

Playwright Test project for the six Software Testing exam cases. The target system is [SauceDemo](https://www.saucedemo.com/); tests use TypeScript and Chromium.

## Requirements and commands

- Node.js and npm
- Install dependencies: `npm ci`
- Install the browser: `npx playwright install chromium`
- Run all tests and create HTML/JSON reports: `npx playwright test`
- Open the HTML report locally: `npx playwright show-report`
- Type-check: `npm run typecheck`

The standard login is `standard_user` / `secret_sauce`. Tests run sequentially with no retries so the saved reports reflect the actual run.

## Test cases

| File | Test |
| --- | --- |
| `tests/unit/UT-01.spec.ts` | Login required-field and invalid-credential validation |
| `tests/unit/UT-02.spec.ts` | Add to cart / Remove button and badge state |
| `tests/integration/IT-01.spec.ts` | Real login followed by a browser-level Inventory stub |
| `tests/integration/IT-02.spec.ts` | Driver-created login cookie followed by real Inventory and Cart |
| `tests/system/ST-01.spec.ts` | Purchase two products from login through order confirmation |
| `tests/system/ST-02.spec.ts` | Checkout validation and recovery through order confirmation |

## Integration-test boundaries

- **IT-01:** Login and navigation to `inventory.html` use the real SauceDemo application. After login, `page.setContent()` replaces the browser document with a small Inventory DOM stub containing `Mock Inventory Ready`, `Mock Backpack`, and `Mock Bike Light`. The stub is a browser-level simulation, not an internal SauceDemo module.
- **IT-02:** `driverOpenInventory()` is the Driver. It creates a browser context, adds the `session-username=standard_user` cookie, and opens the real `/inventory.html` URL directly without submitting the login form. Inventory, cart actions, and cart contents are the real SauceDemo UI.

## Reports and GitHub submission

Each test run writes the HTML report to `playwright-report/` and the JSON report to `reports/results.json`. `reports/test-summary.md` must be updated from the actual run results before submission; do not edit report results manually.

Create a GitHub repository named `final-6804101332`, add the instructor as a collaborator if the repository is private, and push this project and its generated reports. Submit only the repository URL. The GitHub username and instructor account are not available in this workspace, so repository creation and push must be completed using the student's account.

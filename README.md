# coyoAddressBookTests
E2E Test suite built on Cypress.io using nodeJS

## How to run
1. Clone this repository into a new folder
2. Open terminal/ cmd and navigate to the new folder
3. run `npm install` to download all dependencies

### To run all tests:
- run `npx cypress run`

### To run single spec:
- run `npx cypress run --spec "cypress/integration/<spec-name.js>"`

### To run in headed mode:
- run `npx cypress run --headed`

### To run using Cypress UI:
- run`npx cypress open` and select specs from there.

## Changing config:
- Base URL can be updated in `cypress.json` in project root
- Locators for Web elements can be found for each page in `./cypress/fixtures/locators` folder
- Expected data for text validation can be updated/added in `./cypress/fixtures/data/expectedTexts.json`

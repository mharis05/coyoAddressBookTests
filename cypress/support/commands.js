import * as signInlocators from '../fixtures/locators/signInPageLocators'
import * as newAddressPageLocators from '../fixtures/locators/newAddressPageLocators'

Cypress.Commands.add("setViewPort", () => {
  cy.viewport(screen.width, screen.height)
})


Cypress.Commands.add("openAddressBookPage", (page) => {
  cy.setViewPort()
  switch (page) {
    case "home":
      cy.visit("/")
      break;
    default:
      cy.visit("/" + "/" + page)
      break;
  }
})

Cypress.Commands.add("signUpUser", (locators, user) => {
  cy.get(locators.emailTxt).type(user.email)
  if (user.password != "") {
    cy.get(locators.passwordTxt).type(user.password)
  }
  cy.get(locators.submitBtn).contains("Sign up").click()
})

Cypress.Commands.add("signInUser", () => {
  cy.fixture('../fixtures/data/userData.json').then(function (data) {
    cy.openAddressBookPage("sign_in")
    cy.get(signInlocators.emailTxt).type(data.email)
    cy.get(signInlocators.passwordTxt).type(data.password)
    cy.get(signInlocators.submitBtn).click()
  })
})

Cypress.Commands.add("enterAddressData", (type, data) => {
  if (type.toLowerCase() != 'missing') {
    enterRequiredData(data)
  }
  if (type.toLowerCase() == 'full') {
    enterOptionalData(data)
  }
  cy.get(newAddressPageLocators.submitButton).click()
})

export function enterRequiredData(addressData) {
  cy.get(newAddressPageLocators.firstNameTxt).type(addressData.firstName)
  cy.get(newAddressPageLocators.lastNameTxt).type(addressData.lastName)
  cy.get(newAddressPageLocators.address1Txt).type(addressData.address1)
  cy.get(newAddressPageLocators.cityTxt).type(addressData.city)
  cy.get(newAddressPageLocators.zipCodeTxt).type(addressData.zipCode)
}

export function enterOptionalData(addressData) {
  cy.get(newAddressPageLocators.address2Txt).type(addressData.address2)
  cy.get(newAddressPageLocators.stateSelect).select(addressData.state)
  console.log("select state: ", addressData.state)
  cy.get(newAddressPageLocators.countryUSRadio).check()
  cy.get(newAddressPageLocators.birthdayDate).type(addressData.birthday)
  cy.get(newAddressPageLocators.colorSelect)
    .invoke('val', addressData.color)
    .trigger('change')
  cy.get(newAddressPageLocators.ageTxt).type(addressData.age)
  cy.get(newAddressPageLocators.websiteTxt).type(addressData.website)
  cy.get(newAddressPageLocators.phoneTxt).type(addressData.phone)
  cy.get(newAddressPageLocators.interestCheckboxGroup).then(($checkboxes) => {
    cy.get($checkboxes[addressData.interest]).check()
  })
  cy.get(newAddressPageLocators.noteTxt).type(addressData.note)
}


Cypress.Commands.add("assertTextEquivalence", (locator, expectedText) => {
  cy.get(locator).should(($element) => {
    var actualText = $element.text().trim().toString()
    assert.equal(actualText, expectedText);
  })
})
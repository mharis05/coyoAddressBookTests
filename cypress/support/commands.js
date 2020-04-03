import * as signInlocators from '../fixtures/locators/signInPageLocators'
import * as newAddressPageLocators from '../fixtures/locators/newAddressPageLocators'
import * as signUplocators from '../fixtures/locators/registrationPageLocators'
import { createAddressData } from './customMethods'


/*

This file contains several helper/support methods that can be used across
the test framwork to increase code reusability and readability

*/

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
      cy.visit("/" + page)
      break;
  }
})

Cypress.Commands.add("createNewAddress", (type) => {
  cy.openAddressBookPage("addresses/new")
  var addressData = createAddressData(type)
  cy.enterAddressData(type, addressData)
  cy.openAddressBookPage("addresses")
})

Cypress.Commands.add("signUpUser", (user) => {

  cy.get(signUplocators.emailTxt).type(user.email)
  if (user.password != "") {
    cy.get(signUplocators.passwordTxt).type(user.password)
  }
  cy.get(signUplocators.submitBtn).contains("Sign up").click()
})

Cypress.Commands.add("signInUser", (userCredentials) => {
  /* Due to a possible issue in how cypress handles cookies, clearing 
  then manually before signing in
  */
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
  cy.reload()
  cy.clearCookies()
  cy.fixture('../fixtures/data/userData.json').as('data')
  cy.openAddressBookPage("sign_in")
  cy.get('@data').then((dataValues) => {
    if (userCredentials != undefined) {
      dataValues = userCredentials
    }
    cy.get(signInlocators.emailTxt).type(dataValues.email)
    cy.get(signInlocators.passwordTxt).type(dataValues.password)
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

Cypress.Commands.add("verifyValueVisibility", (value) => {
  cy.xpath(`.//td[contains(text(),'${value}')]`)
    .should('be.visible')
})

Cypress.Commands.add("assertTextEquivalence", (locator, expectedText) => {
  cy.get(locator).should(($element) => {
    var actualText = $element.text().trim().toString()
    assert.equal(actualText, expectedText);
  })
})

export function enterRequiredData(addressData) {
  cy.get(newAddressPageLocators.firstNameTxt).clear().type(addressData.firstName)
  cy.get(newAddressPageLocators.lastNameTxt).clear().type(addressData.lastName)
  cy.get(newAddressPageLocators.address1Txt).clear().type(addressData.address1)
  cy.get(newAddressPageLocators.cityTxt).clear().type(addressData.city)
  cy.get(newAddressPageLocators.zipCodeTxt).clear().type(addressData.zipCode)
}

export function enterOptionalData(addressData) {
  cy.get(newAddressPageLocators.address2Txt).clear().type(addressData.address2)
  cy.get(newAddressPageLocators.stateSelect).select(addressData.state)
  console.log("select state: ", addressData.state)
  cy.get(newAddressPageLocators.countryUSRadio).check()
  cy.get(newAddressPageLocators.birthdayDate).clear().type(addressData.birthday)
  cy.get(newAddressPageLocators.colorSelect)
    .invoke('val', addressData.color)
    .trigger('change')
  cy.get(newAddressPageLocators.ageTxt).clear().type(addressData.age)
  cy.get(newAddressPageLocators.websiteTxt).clear().type(addressData.website)
  cy.get(newAddressPageLocators.phoneTxt).clear().type(addressData.phone)
  cy.get(newAddressPageLocators.interestCheckboxGroup).then(($checkboxes) => {
    cy.get($checkboxes[addressData.interest]).check()
  })
  cy.get(newAddressPageLocators.noteTxt).clear().type(addressData.note)
}
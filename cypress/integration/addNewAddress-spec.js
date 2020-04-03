import * as locators from '../fixtures/locators/newAddressPageLocators'
import * as addressDetailsLocators from '../fixtures/locators/addressDetailLocators'
import { createAddressData } from '../support/customMethods'

/*
Tests for adding new address to the address book
*/

describe("Add new Address Tests", function () {
  let newAddressPageTexts

  before(function () {
    cy.fixture('data/expectedTexts.json').then(function (jsonData) {
      newAddressPageTexts = jsonData
    })
  })

  beforeEach(function () {
    cy.signInUser()
    cy.openAddressBookPage("addresses/new")
  })

  it('Validates that address is saved after entering only required data', function () {
    var addressData = createAddressData('full')
    cy.enterAddressData('required', addressData)

    cy.get(addressDetailsLocators.alertMessage)
      .should('have.text', newAddressPageTexts.addressDetailsPage.alertMessage)
  })

  it('Validate that error is shown if no data is entered', function () {
    cy.get(locators.submitButton).click()
    cy.get(addressDetailsLocators.errorExplanation)
      .should('include.text', newAddressPageTexts.addressDetailsPage.errorExplanation)
  })

  it('Validates that address entry is saved correctly if all data is entered', function () {
    var addressData = createAddressData('full')
    cy.enterAddressData('full', addressData)
    cy.get(addressDetailsLocators.alertMessage)
      .should('have.text', newAddressPageTexts.addressDetailsPage.alertMessage)
  })


})
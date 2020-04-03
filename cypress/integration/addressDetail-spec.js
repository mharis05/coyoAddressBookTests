import * as addressDetailsLocators from '../fixtures/locators/addressDetailLocators'
import { createAddressData } from '../support/customMethods'
import { stateMapping } from '../fixtures/data/stateAbbrev'

/*
Tests for Address details feature
*/

describe('Address Detail Tests', function () {

  let addressDetailsTexts
  before(function () {
    cy.fixture('data/expectedTexts.json').then(function (jsonData) {
      addressDetailsTexts = jsonData.addressDetailsPage
    })
  })

  beforeEach(function () {
    cy.signInUser()
    cy.openAddressBookPage("addresses/new")
  })

  it('Validates that address detail values are correctly saved when a new address is added with all data', function () {
    var addressData = createAddressData('full')
    cy.enterAddressData('full', addressData)
    cy.assertTextEquivalence(addressDetailsLocators.firstNameValue, addressData.firstName)
    cy.assertTextEquivalence(addressDetailsLocators.lastNameValue, addressData.lastName)
    cy.assertTextEquivalence(addressDetailsLocators.address1Value, addressData.address1)
    cy.assertTextEquivalence(addressDetailsLocators.address2Value, addressData.address2)
    cy.assertTextEquivalence(addressDetailsLocators.cityValue, addressData.city)
    cy.assertTextEquivalence(addressDetailsLocators.stateValue, stateMapping[addressData.state])
    cy.assertTextEquivalence(addressDetailsLocators.zipcodeValue, addressData.zipCode)
    cy.assertTextEquivalence(addressDetailsLocators.countryValue, addressData.country)
    cy.assertTextEquivalence(addressDetailsLocators.birthdayValue, Cypress.moment(addressData.birthday)
      .format('M/DD/YYYY'))
    cy.get(addressDetailsLocators.colorValue)
      .invoke('attr', 'style')
      .should('include', `background: ${addressData.color}`)
    cy.assertTextEquivalence(addressDetailsLocators.ageValue, addressData.age)
    cy.assertTextEquivalence(addressDetailsLocators.websiteValue, addressData.website)
    cy.assertTextEquivalence(addressDetailsLocators.phoneValue, addressData.phone)
    cy.assertTextEquivalence(addressDetailsLocators.notetValue, addressData.note)
  })

  it('Validate that a user can open Edit listing page from Address details', function () {
    var addressData = createAddressData('required')
    cy.enterAddressData('required', addressData)
    cy.get(addressDetailsLocators.editLink)
      .should('have.text', addressDetailsTexts.editLink)
      .and('have.attr', 'href').and('include', '/edit')
  })

  it('Validate that a user can open Address listings page from Address details', function () {
    var addressData = createAddressData('required')
    cy.enterAddressData('required', addressData)
    cy.get(addressDetailsLocators.listLink)
      .should('have.text', addressDetailsTexts.listLink)
      .and('have.attr', 'href').and('include', '/addresses')
  })
})
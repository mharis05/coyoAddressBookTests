import * as addressDetailsLocators from '../fixtures/locators/addressDetailLocators'
import { createAddressData } from '../support/customMethods'
import {stateMapping} from '../fixtures/data/stateAbbrev'

let addressDetailsTexts
describe('Address Detail Tests', function () {
  before(function () {
    cy.fixture('data/expectedTexts.json').then(function (jsonData) {
      addressDetailsTexts = jsonData.addressDetailPage
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
    cy.assertTextEquivalence(addressDetailsLocators.birthdayValue, Cypress.moment(addressData.birthday).format('M/DD/YYYY'))
    cy.assertTextEquivalence(addressDetailsLocators.ageValue, addressData.age)
    cy.assertTextEquivalence(addressDetailsLocators.websiteValue, addressData.website)
    cy.assertTextEquivalence(addressDetailsLocators.phoneValue, addressData.phone)
    cy.assertTextEquivalence(addressDetailsLocators.notetValue, addressData.note)

  })
})
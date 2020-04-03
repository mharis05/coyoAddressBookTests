import * as editDetailsLocators from '../fixtures/locators/addressDetailLocators'
import { createAddressData } from '../support/customMethods'
describe('Edit an Address Listing Tests', function(){
  let addressId
  let editAddressTexts

  before(function () {
    cy.fixture('data/expectedTexts.json').then(function (jsonData) {
      editAddressTexts = jsonData.editAddressPage
    })
  })

  beforeEach(function () {
    cy.signInUser()
    cy.openAddressBookPage("addresses/new")
    var addressData = createAddressData('required')
    cy.enterAddressData('required', addressData)

    // Get listing ID from the URL
    cy.url().then(($url) => {
      addressId = $url.split('/').pop();
      cy.openAddressBookPage(`addresses/${addressId}/edit`)
    })
  })

  it('Validates that address listing can be successfully edited', function() {
    var addressData = createAddressData('required')
    cy.enterAddressData('required', addressData)
    cy.assertTextEquivalence(editDetailsLocators.firstNameValue, addressData.firstName)
    cy.assertTextEquivalence(editDetailsLocators.lastNameValue, addressData.lastName)
    cy.assertTextEquivalence(editDetailsLocators.address1Value, addressData.address1)
    cy.assertTextEquivalence(editDetailsLocators.cityValue, addressData.city)
    cy.assertTextEquivalence(editDetailsLocators.zipcodeValue, addressData.zipCode)
  })
})
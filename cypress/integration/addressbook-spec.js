import * as locators from '../fixtures/locators/addressbookPageLocators'

describe('Address Book Module Tests', function () {
  let addressBookPageTexts

  before(function () {
    cy.fixture('data/expectedTexts.json').then(function (jsonData) {
      addressBookPageTexts = jsonData.addressBookPage
    })
  })

  beforeEach(function () {
    cy.signInUser()
    cy.openAddressBookPage("addresses")
  })

  it('Validate that address book page displays main title and address list', function () {
    cy.get(locators.addressMainTitle).should('have.text', addressBookPageTexts.mainTitleText)
  })

  it('Validate that address book page has link to add new address', function () {
    cy.get(locators.addNewAddressLink)
      .should('have.text', addressBookPageTexts.addNewAddressLink)
      .and('have.attr', 'href', '/addresses/new')
  })
})
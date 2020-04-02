import * as locators from '../fixtures/locators/loggedInWelcomePageLocators'

describe('Address Book Module Tests', function () {
  let welcomePageTexts

  before(function () {
    cy.fixture('data/expectedTexts.json').then(function (jsonData) {
      welcomePageTexts = jsonData
    })
  })

  beforeEach(function () {
    cy.signInUser()
  })

  it('Validate that address book page can be accessed by a logged in user', function () {
    cy.get(locators.addressesTopLabel)
      .should('have.text', welcomePageTexts.loggedInHomePage.addressesLabel)
      .and('have.attr', 'href').and('equal', '/addresses')
  })

  it('Validate that Sign out link is displayed to logged in user', function () {
    cy.get(locators.signOutTopLabel)
      .should('have.text', welcomePageTexts.loggedInHomePage.signOutTopLabel)
      .and('have.attr', 'href').and('equal', '/sign_out')
  })
})
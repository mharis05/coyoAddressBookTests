import * as locators from '../fixtures/locators/welcomePageLocators'
import { createNewTestUser } from '../support/customMethods'

let homePageTexts
describe("Welcome Page Tests", function () {
  // Tests for the Welcome page

  before(function () {
    cy.fixture('data/expectedTexts.json').then(function (jsonData) {
      homePageTexts = jsonData.homePage
    })
  })

  beforeEach(function () {
    cy.openAddressBookPage("home")
  })

  it('Validate that Welcome page shows friendly welcome messages when opened', function () {
    cy.get(locators.welcomeTitleTxt).should('have.text',homePageTexts.welcomeTitle)
    cy.get(locators.welcomeSubtitleTxt).should('include.text',homePageTexts.welcomeSubtitle)
  })

  it('Validate that Welcome page has links to Sign in and Home Page', function () {
    cy.get(locators.homePageLink).should('include.text',homePageTexts.HomePageLinkLabel)
    cy.get(locators.signInPageLink).should('have.text',homePageTexts.SignInLinkLabel)
  })


  it('Validate that Welcome page has link to Sign in Page', function () {
    cy.get(locators.signInPageLink).should('have.attr', 'href', '/sign_in') 
  })

  it('Validate that Welcome page has link to itself', function () {
    cy.get(locators.homePageLink).should('have.attr', 'href').and('equal', '/')

  })
}) 

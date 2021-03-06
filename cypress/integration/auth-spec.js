import * as locators from '../fixtures/locators/signInPageLocators'
import {userAccountLabel} from '../fixtures/locators/registrationPageLocators'
import {signOutTopLabel} from '../fixtures/locators/loggedInWelcomePageLocators'

/*
Tests for Sign In and Sign out (Authentication) features.
*/

describe('Autentication Tests', function () {
  let signInPageTexts
  let userData

  before(function () {
    cy.fixture('data/expectedTexts.json').then(function (jsonData) {
      signInPageTexts = jsonData.signInPage
    })
    cy.fixture('data/userData.json').then(function (jsonData) {
      userData = jsonData
    })
  })

  beforeEach(function () {
    cy.openAddressBookPage("sign_in")
  })

  it('Validate that Sign In page contains Email and Password text boxes with appropriate placeholder text', function () {
    cy.get(locators.pageTitleLabel).should("have.text", signInPageTexts.signInTitle)
    cy.get(locators.emailTxt).should("be.enabled").and('have.attr', 'placeholder', 'Email')
    cy.get(locators.passwordTxt).should("be.enabled").and('have.attr', 'placeholder', 'Password')
    cy.get(locators.submitBtn).should("be.enabled")
  })

  it('Validate that Sign up link redirects to Sign up page', function () {
    cy.get(locators.signUpLink).should('have.attr', 'href').and('equal', '/sign_up')
      .then((href) => {
        cy.visit(href).then(() => {
          cy.url().should('include', '/sign_up')
        })
      })
  })

  it('Validate that user can successfully log in to Address book using valid credentials', function () {
    cy.get(locators.emailTxt).type(userData.email)
    cy.get(locators.passwordTxt).type(userData.password)
    cy.get(locators.submitBtn).click().then(() => {
      cy.get(userAccountLabel).should('have.text', userData.email)
    })
  })

  it('Validate that error message is displayed if no password is provided', function () {
    cy.get(locators.emailTxt).type(userData.email)
    cy.get(locators.submitBtn).click().then(() => {
      cy.get(locators.errorMessage).should('have.text', signInPageTexts.signInErrorText)
    })
  })

  it('Validate that error message is displayed if no email is provided', function () {
    cy.get(locators.passwordTxt).type(userData.password)
    cy.get(locators.submitBtn).click().then(() => {
      cy.get(locators.errorMessage).should('have.text', signInPageTexts.signInErrorText)
    })
  })

  it('Validates that user can sign out of the address book app', function(){
    cy.signInUser()
    cy.get(signOutTopLabel).click()
    cy.url().should('include','/sign_in')
  })

})
import * as locators from '../fixtures/locators/registrationPageLocators'
import { createNewUser } from '../support/customMethods'

describe('Tests for Sign Up module', function () {
  let signUpPageTexts

  before(function () {
    cy.fixture('data/expectedTexts.json').then(function (jsonData) {
      signUpPageTexts = jsonData.signUpPage
    })
  })

  beforeEach(function () {
    cy.openAddressBookPage("sign_up")
  })

  it('Validate that Sign Up page contains Email and Password text boxes with appropriate placeholder text', function () {
    cy.get(locators.pageTitleLabel).should("have.text", signUpPageTexts.signUpTitle)
    cy.get(locators.emailTxt).should("be.enabled").and('have.attr', 'placeholder', 'Email')
    cy.get(locators.passwordTxt).should("be.enabled").and('have.attr', 'placeholder', 'Password')
    cy.get(locators.submitBtn).should("be.enabled")
  })

  it('Validate that Sign in link redirects to Sign in page', function () {
    cy.get(locators.signInLink).should('have.attr', 'href')
      .and('equal', '/sign_in')
      .then((href) => {
        cy.visit(href).then(() => {
          cy.url().should('include', '/sign_in')
        })
      })
  })

  it('Validate that user can successfully sign up by providing valid credentials', function () {
    var user = createNewUser()
    cy.signUpUser(locators, user)
    cy.get(locators.userAccountLabel).should('have.text', user.email)
  })

  it('Validate that user cannot sign up by providing invalid email', function () {
    var user = createNewUser("invalid")
    cy.signUpUser(locators, user)
    cy.get(locators.signInTopLabel).should('have.text', signUpPageTexts.signInLinkText)
  })

  it('Validate that user cannot sign without providing a password', function () {
    var user = createNewUser(undefined, "invalid")
    cy.signUpUser(locators, user)
    cy.get(locators.signInTopLabel).should('have.text', signUpPageTexts.signInLinkText)
  })

  it.only('Validate that registered user can sign in when their credentials', function(){
    var user = createNewUser()
    cy.signUpUser(locators, user)
    cy.signInUser({email: user.email, password: user.password})
  })
})

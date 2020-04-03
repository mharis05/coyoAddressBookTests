// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath')
import {createNewUser} from './customMethods'

before(function () {
  // now this runs prior to every test
  // across all files no matter what
  var user = createNewUser()
  cy.writeFile('./cypress/fixtures/data/userData.json',
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    })
  cy.readFile('./cypress/fixtures/data/userData.json').then((user) => {
    expect(user.firstName).to.equal(user.firstName) 
    cy.openAddressBookPage("sign_up")
    cy.signUpUser(user)
    cy.clearCookies()
    cy.visit("/")
  })
})

// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test due to issues in application code
  return false
});
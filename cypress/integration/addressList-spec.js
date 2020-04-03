import { createAddressData } from '../support/customMethods'
import * as addressListLocators from '../fixtures/locators/addressListPageLocators'

describe('Tests for Address List', function () {
  let addressListTexts

  before(function () {
    cy.fixture('data/expectedTexts.json').then(function (jsonData) {
      addressListTexts = jsonData.addressListPage
    })
  })

  beforeEach(function () {
    cy.signInUser()
    cy.openAddressBookPage("addresses")
  })

  it('Validate that address book page displays main title and address list', function () {
    cy.get(addressListLocators.addressesMainTitle)
      .should('have.text', addressListTexts.mainTitleText)
  })

  it('Validate that details of saved address can be viewed from the address list using Show link', function () {
    cy.createNewAddress('required')
    cy.xpath(addressListLocators.showRowLink).first().then(($link) => {
      cy.get($link).contains(addressListTexts.showAddressLink)
        .should('have.attr', 'data-test')
        .and('include', 'show')
      cy.get($link).click()
      cy.url().then(($url) => {
        expect($url).to.include('addresses/')
      })
    })
  })

  it('Validate that saved address can be edited from the address list using Edit link', function () {
    cy.createNewAddress('required')
    cy.xpath(addressListLocators.editRowLink).first().then(($link) => {
      cy.get($link).contains(addressListTexts.editAddressLink)
        .should('have.attr', 'data-test')
        .and('include', 'edit')
      cy.get($link).click()
      cy.url().then(($url) => {
        expect($url).to.include('edit')
      })
    })
  })

  it('Validate that saved address can be deleted from address list using destroy link', function () {
    cy.createNewAddress('required')
    cy.get(addressListLocators.deleteRowLink).first().then(($link) => {
      cy.get($link).contains(addressListTexts.destroyAddressLink)
        .should('have.attr', 'data-test')
        .and('include', 'destroy')
    })
  })

  it('Validate that new address can be added from address list', function () {
    cy.get(addressListLocators.newAddressLink)
      .contains(addressListTexts.newAddressLink)
      .should('have.attr', 'href')
      .and('include', 'addresses/new')
  })

  it('Validate that newly added address is listed on the address list', function () {
    var addressData = createAddressData('required')
    cy.openAddressBookPage("addresses/new")
    cy.enterAddressData('required', addressData)
    cy.openAddressBookPage("addresses")
    cy.verifyValueVisibility(addressData.firstName)
    cy.verifyValueVisibility(addressData.lastName)
    cy.verifyValueVisibility(addressData.city)
  })
})
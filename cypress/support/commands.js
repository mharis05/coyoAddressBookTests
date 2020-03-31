
Cypress.Commands.add("setViewPort", () => {
  cy.viewport(screen.width, screen.height)
})


Cypress.Commands.add("openAddressBookPage", (page) => {
  cy.setViewPort()
  switch (page) {
    case "home":
      cy.visit("/")
      break;
    default:
      cy.visit("/" + "/" + page)
      break;
  }
})

Cypress.Commands.add("signUpUser", (locators, user) => {
  cy.get(locators.emailTxt).type(user.email)
  if (user.password != "") {
    cy.get(locators.passwordTxt).type(user.password)
  }
  cy.get(locators.submitBtn).contains("Sign up").click()
})
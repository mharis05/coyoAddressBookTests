var random_name = require('node-random-name')
var locators = require('../fixtures/locators/registrationPageLocators')

export function generateRandomData(type) {
  switch (type) {
    case "email":
      return (random_name({ first: true }).trim()
        .concat(random_name({ last: true })).trim()
        .concat("@test.com")).toLowerCase()

    case "firstname":
      return random_name({ first: true })

    case "lastname":
      return random_name({ last: true })

  }
}

export function createNewUser(emailType = 'valid', passwordType = 'valid') {
  var firstName = random_name({ first: true }).trim()
  var lastName = random_name({ last: true }).trim()
  var email = createEmail(emailType, firstName, lastName)
  var password = createPassword(passwordType)
  return {
    fname: firstName,
    lname: lastName,
    email: email,
    fullName: firstName + " " + lastName,
    password: password
  }
}

export function createEmail(type, firstName, lastName) {
  if (type == "valid") {
    return firstName.trim().toLowerCase() + lastName.trim().toLowerCase() + "@testemail.com"
  } else {
    return firstName.trim().toLowerCase() + lastName.trim().toLowerCase() + ".com"
  }
}

export function createPassword(type) {
  if (type == "valid") {
    return "validPassword123"
  } else {
    return ""
  }
}


export function registerNewUser() {
  cy.openAddressBookPage("sign_up")
  var user = createNewUser()
  cy.signUpUser(locators, user)
  return user
}
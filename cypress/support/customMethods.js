var faker = require('faker')
var signUplocators = require('../fixtures/locators/registrationPageLocators')

// Generate fake data for a new user
export function createNewUser(emailType = 'valid', passwordType = 'valid') {
  var firstName = faker.name.firstName().trim()
  var lastName = faker.name.lastName().trim()
  var email = createEmail(emailType, firstName, lastName)
  var password = createPassword(passwordType)
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    fullName: firstName + " " + lastName,
    password: password
  }
}

// Generate fake data for a new address 
export function createAddressData(type) {
  var addressData = {

    requiredData: function () {
      return {
        firstName: faker.name.firstName().trim(),
        lastName: faker.name.lastName().trim(),
        address1: faker.address.streetAddress(),
        city: faker.address.city(),
        zipCode: faker.address.zipCode(),
      }
    },
    allData: function () {
      // For birthday
      var start = new Date(1900, 0, 1)
      var end = new Date()

      // create object for required data
      var required = this.requiredData()

      return {
        //destructure object
        ...required,

        //optional
        address2: faker.address.streetName(false),
        state: faker.address.state(),
        country: 'us',
        birthday: Cypress.moment(randomDate(start, end)).format('YYYY-MM-DD'),
        color: "#" + Math.random().toString(16).slice(2, 8),
        age: faker.random.number(100),
        website: "http://www." + faker.internet.domainName() + faker.internet.domainSuffix(),
        phone: faker.phone.phoneNumberFormat(),
        interest: selectInterest(0, 2),
        note: faker.lorem.sentence()
      }
    }
  };

  if (type == 'required') {
    return addressData.requiredData()
  }
  else {
    return addressData.allData()
  }

}

// Required for generating birthday
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Random selection for interest
function selectInterest(min, max) {
  var selection = Math.floor(
    Math.random() * (max - min) + min
  )
  return selection
}

// Create a new email for a user
export function createEmail(type, firstName, lastName) {
  if (type == "valid") {
    return firstName.replace(/[^a-zA-Z ]/g, "").trim().toLowerCase() 
    + lastName.replace(/[^a-zA-Z ]/g, "").trim().toLowerCase() + "@testemail.com"
  } else {
    return firstName.replace(/[^a-zA-Z ]/g, "").trim().toLowerCase() 
    + lastName.replace(/[^a-zA-Z ]/g, "").trim().toLowerCase() + ".com"
  }
}

// Create password for user
export function createPassword(type) {
  if (type == "valid") {
    return "validPassword123"
  } else {
    return ""
  }
}

// Sign up a new user
export function registerNewUser() {
  cy.openAddressBookPage("sign_up")
  var user = createNewUser()
  cy.signUpUser(user)
  return user
}
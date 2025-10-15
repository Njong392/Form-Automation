import { RegisterPage } from "../pages/RegisterPage"
import { CommonActions } from "../actions/CommonActions"

const ca = new CommonActions()
const registerPage = new RegisterPage()

describe('Register Page', () => {

  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/form-validation')

    cy.fixture("pageContent/dropdown.json").then(dropdown => {
      cy.wrap(dropdown).as("dropdown")
    })

    cy.fixture("user/userData.json").then((user) => {
      cy.wrap(user).as("userData")
    })
  })

  it('Verifies that the form cannot be sent with all empty fields', () => {
    // clear the contact name first because it is prefilled
    registerPage.clearContactName()

    // click on register button and ensure it redirects
    registerPage.clickOnRegisterButton()
    ca.verifyLinkDoesNotRedirect('pathname', '/form-confirmation')
  })

  it('Verifies that the payment dropdown has options', () => {
    // opens the select dropdown quite alright, but picks the element instead of just verifying it exists
    cy.get('@dropdown').then((dropdown) => {
      ca.verifyDropdownValues(registerPage.register_payment_identifier, dropdown.options)
    })
    
  })

  it.only('Verifies that user is redirected upon sign up', () => {
    // enter all form fields
    registerPage.enterContactNumber(ca.generateContactNumber())
    registerPage.enterPayment(2)
    cy.get('@userData').then(userData => {
      registerPage.enterContactName(userData.contactName)
      registerPage.enterPickupDate(userData.pickupDate)
    })

    // clicks on register button and verifies redirection
    registerPage.clickOnRegisterButton()
    ca.verifyLinkRedirection('pathname', '/form-confirmation')

    // asserts that this validation message exists on the new page
    ca.assertTextWithinIdentifier(registerPage.main_successmessage_identifier, 'Thank you for validating your ticket')
  })

  it('Verifies that contact name being empty throws an error', () => {
    // enters all fields except the contact name
    registerPage.clearContactName()
    registerPage.enterContactNumber(ca.generateContactNumber())
    registerPage.enterPayment(2)
    registerPage.clickOnRegisterButton()
    cy.get('@userData').then(userData => {
      registerPage.enterPickupDate(userData.pickupDate)
    })
    
    // verifies that the error message appears upon register attempt
    ca.verifyWebElementExists(registerPage.invalid_identifier)
  })

  it('Verifies that contact number being empty throws an error', () => {
    // enters all fields except contact number
    registerPage.enterContactName('emy')
    registerPage.enterPickupDate('2025-10-02')
    registerPage.enterPayment(2)
    registerPage.clickOnRegisterButton()
    ca.verifyWebElementExists(registerPage.invalid_identifier)
  })

  it('Verifies that pickup date being empty throws an error', () => {
    // enters all fields except the pickup date field
    registerPage.enterContactName('emy')
    registerPage.enterContactNumber(ca.generateContactNumber())
    registerPage.enterPayment(2)
    registerPage.clickOnRegisterButton()
    ca.verifyWebElementExists(registerPage.invalid_identifier)
  })


  it('Verifies that payment being empty throws an error', () => {
    // enters all fields except the the payment method field
    registerPage.enterContactName('emy')
     registerPage.enterPickupDate('2025-10-02')
    registerPage.enterContactNumber(ca.generateContactNumber())
    registerPage.clickOnRegisterButton()
    ca.verifyWebElementExists(registerPage.invalid_identifier)
  })

  it('Verifies that user enters correct Contact number', () => {
     // enter all form fields with incorrect contact number
    registerPage.enterContactName('emy')
    registerPage.enterContactNumber(ca.generateIncorrectContactNumber())
    registerPage.enterPickupDate('2025-10-02')
    registerPage.enterPayment(2)

    // clicks on register button and verifies error message
    registerPage.clickOnRegisterButton()
    ca.verifyWebElementExists(registerPage.invalid_identifier)
  })


  // this test case assumes that there is a database and the user exists
  it('Verifies that user can NOT register twice', () => {
    registerPage.enterContactName('emy')
    registerPage.enterContactNumber(ca.generateContactNumber())
    registerPage.enterPickupDate('2025-10-02')
    registerPage.enterPayment(2)
    registerPage.clickOnRegisterButton()

    // verifies that the button does not redirect the existing user
    ca.verifyLinkDoesNotRedirect('pathname', '/form-confirmation')

  })

})
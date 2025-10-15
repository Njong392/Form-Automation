import { CommonActions } from "../actions/CommonActions";

const ca = new CommonActions()

export class RegisterPage{
    // web element identifiers for register page
    register_contactname_identifier = 'input[name="ContactName"]'
    register_contactnumber_identifier = 'input[name="contactnumber"]'
    register_pickupdate_identifier = 'input[name="pickupdate"]'
    register_payment_identifier = 'select[name="payment"]'
    register_button_identifier = 'button[type="submit"]'
    main_successmessage_identifier = 'div[role="alert"]'
    invalid_identifier = 'div[class="invalid-feedback"]'

    // action methods
    enterContactName(value){
        ca.enterValueInField(this.register_contactname_identifier, value)
    }

    enterContactNumber(value){
        ca.enterValueInField(this.register_contactnumber_identifier, value)
    }

    enterPayment(index){
        ca.selectDropDownValueByIndex(this.register_payment_identifier, index)
    }

    enterPickupDate(value){
        ca.enterValueInField(this.register_pickupdate_identifier, value)
    }

    clickOnRegisterButton(){
        ca.clickOnWebElement(this.register_button_identifier)
    }

    clearContactName(){
        ca.clearValueInAField(this.register_contactname_identifier)
    }
}
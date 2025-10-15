export class CommonActions {
    // Click on a web element
    clickOnWebElement(webelement_identifier) {
        cy.get(webelement_identifier).click()
    }

    // Generate contact number with 3 digits followed by "-" and then 7 digits all between 0 and 9
    generateContactNumber() {
        let contactNumber = '';
        for (let i = 0; i <= 9; i++) {
            contactNumber += Math.floor(Math.random() * 10);
        }

        let position = 3
        let newContact = contactNumber.slice(0, position) + "-" + contactNumber.slice(position)

        return newContact;
    }

    // Generate incorrect pattern of numbers
    generateIncorrectContactNumber() {
        let contactNumber = '';
        for (let i = 0; i <= 9; i++) {
            contactNumber += Math.floor(Math.random() * 10);
        }

        return contactNumber
    }

    // Clearing a value from a field
    clearValueInAField(webelement_identifier){
        cy.get(webelement_identifier).clear()
    }

    // Enter a value into a field
    enterValueInField(webelement_identifier, value) {
        cy.get(webelement_identifier).type(value)
    }

    // assert that a web element exists in the DOM
    verifyWebElementExists(webelement_identifier) {
        cy.get(webelement_identifier).should('exist')
    }

    // assert that an identifier contains some text
    assertTextWithinIdentifier(webelement_identifier, expectedText) {
        cy.get(webelement_identifier).contains(expectedText)
    }

    // check if a dropdown has values
    verifyDropdownValues(webelement_identifier, values = []) {
        cy.get(webelement_identifier).select(1)

        // checks that each value in the values [] is visible in the dropdown
        values.forEach(value => {
            cy.contains(value).should('be.visible')
        })

        cy.get('body').click(0,0) // clicks anywhere on the page to close the dropdown: click outside event
    }

    // select a value from the dropdown
    selectDropDownValueByIndex(webelement_identifier, index) {
        cy.get(webelement_identifier).select(index)
    }


    // checks that a link redirects to another page
    verifyLinkRedirection(path, expectedNewPage){
        cy.location(path).should('equal', expectedNewPage)
    }

    // checks that a link does not redirect to another page
    verifyLinkDoesNotRedirect(path, expectedNewPage){
        cy.location(path).should('not.equal', expectedNewPage)
    }


}
/// <reference types = "cypress" />
describe( "<SignUp />", () => {

    it( "<SignUp /> Creación de cuenta", () => {

        cy.visit("/sign-up")

        // Rellenamos los datos del formulario
        cy.get( "[data-cy=email-signup]" ).type("test@test.com")
        cy.get( "[data-cy=password-signup]" ).type("123456")
        cy.get( "[data-cy=confirmation-signup]" ).type("123456")

        // Creamos el usuairo
        cy.get( "[data-cy=submit-signup]" ).click()

        // Revismos que aparezca la tostada
        cy.get(".chakra-alert__title")
            .should( "exist" )
            .invoke( "text" )
            .should( "equal", "Cuenta creada." )

    })

    it( "<SignUp /> Duplicación de cuenta", () => {

        cy.visit("/sign-up")

        // Rellenamos los datos del formulario
        cy.get( "[data-cy=email-signup]" ).type("test@test.com")
        cy.get( "[data-cy=password-signup]" ).type("123456")
        cy.get( "[data-cy=confirmation-signup]" ).type("123456")

        // Creamos el usuairo
        cy.get( "[data-cy=submit-signup]" ).click()

        // Revismos que aparezca la tostada
        cy.get(".chakra-alert__title")
            .should( "exist" )
            .invoke( "text" )
            .should( "equal", "Sucedió un error" )
            
        cy.get(".chakra-alert__desc")
            .should( "exist" )
            .invoke( "text" )
            .should( "equal", "El usuario ya existe" )

    })

})
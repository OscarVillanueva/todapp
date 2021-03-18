/// <reference types = "cypress" />
describe( "<Login />", () => {

    it('<Login /> User and password incorrect', () => {
        
        cy.visit( "/" )

        // Rellenamos los datos del formulario
        cy.get( "[data-cy=email-login]" ).type("correo@correo.com")
        cy.get( "[data-cy=password-login]" ).type("aqsw")

        cy.get( "[data-cy=submit-login]" ).click()

        // Revismos que aparezca la tostada
        cy.get(".chakra-alert__title")
            .should( "exist" )
            .invoke( "text" )
            .should( "equal", "Sucedió un error" )
            
        cy.get(".chakra-alert__desc")
            .should( "exist" )
            .invoke( "text" )
            .should( "equal", "Usuario o contraseña incorrectos" )

    })

    it('<Login /> User correct and password incorrect', () => {

        cy.visit( "/" )
        
        // Rellenamos los datos del formulario
        cy.get( "[data-cy=email-login]" ).clear().type("test@test.com")
        cy.get( "[data-cy=password-login]" ).clear().type("aqsw")

        cy.get( "[data-cy=submit-login]" ).click()

        // Revismos que aparezca la tostada
        cy.get(".chakra-alert__title")
            .should( "exist" )
            .invoke( "text" )
            .should( "equal", "Sucedió un error" )
            
        cy.get(".chakra-alert__desc")
            .should( "exist" )
            .invoke( "text" )
            .should( "equal", "Usuario o contraseña incorrectos" )

    })

    it('<Login /> User incorrect and password correct', () => {

        cy.visit( "/" )
        
        // Rellenamos los datos del formulario
        cy.get( "[data-cy=email-login]" ).clear().type("correo@correo.com")
        cy.get( "[data-cy=password-login]" ).clear().type("123456")

        cy.get( "[data-cy=submit-login]" ).click()

        // Revismos que aparezca la tostada
        cy.get(".chakra-alert__title")
            .should( "exist" )
            .invoke( "text" )
            .should( "equal", "Sucedió un error" )
            
        cy.get(".chakra-alert__desc")
            .should( "exist" )
            .invoke( "text" )
            .should( "equal", "Usuario o contraseña incorrectos" )

    })

    it('<Login /> User and password correct', () => {
        
        cy.visit( "/" )
        
        // Rellenamos los datos del formulario
        cy.get( "[data-cy=email-login]" ).clear().type("test@test.com")
        cy.get( "[data-cy=password-login]" ).clear().type("123456")

        cy.get( "[data-cy=submit-login]" ).click()

        // Revismos que no aparezca la tostada
        cy.get(".chakra-alert__title")
            .should( "not.exist" )
            
    })
    

})
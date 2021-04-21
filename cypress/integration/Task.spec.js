/// <reference types = "cypress" />

describe('<Tasks />', () => {
    
    it('<Login /> - Receive the token', () => {
        
        cy.visit( "/" )
        
        // Rellenamos los datos del formulario
        cy.get( "[data-cy=email-login]" ).type("test@test.com")
        cy.get( "[data-cy=password-login]" ).type("123456")

        cy.get( "[data-cy=submit-login]" ).click()

        cy.wait( 2000 )

    })

    it('<TodoList /> - Create a task', () => {
        
        // Entramos al primer proyecto
        cy.get( "[data-cy=project]" ).first().click()

        // Sacamos la alerta
        cy.get( "[data-cy=add-project-btn]" ).click()
        cy.get( "[data-cy=projectName]" ).type("Test")
        cy.get( "[data-cy=addProject]" ).click()

        cy.wait( 2000 )

        // Dos por la tarjeta oculta
        cy.get( "[data-cy=todo-list]" ).children().should("have.length.greaterThan", 1)

    })

    it( '<TodoList /> - Change status from todo to done by right click', () => {

        cy.get( "[data-cy=todo-list]" ).first().rightclick()   
        
        cy.get( "[data-cy=change-status]" ).click()

        cy.wait( 1000 )

        cy.get( "[data-cy=done-list]" ).children().should("have.length.greaterThan", 1)

    })

    it( '<TodoList /> - Change status from done to todo by right click', () => {

        cy.get( "[data-cy=done-list]" ).first().rightclick()   
        
        cy.get( "[data-cy=change-status]" ).click()

        cy.wait( 1000 )

        cy.get( "[data-cy=todo-list]" ).children().should("have.length.greaterThan", 1)

    })

    it( '<TodoList /> - Remove task', () => {

        cy.get( "[data-cy=todo-list]" ).first().rightclick()   
        
        cy.get( "[data-cy=delete-card]" ).click()
        
        cy.get( "[data-cy=btn-confirmation-alert]" ).click()

        cy.wait( 1000 )

        cy.get( "[data-cy=todo-list]" ).children().should("have.length", 1)

    })


})

/// <reference types = "cypress" />

describe('<ProjectsList />', () => {

    it('<Login /> - Receive the token', () => {
        
        cy.visit( "/" )
        
        // Rellenamos los datos del formulario
        cy.get( "[data-cy=email-login]" ).type("test@test.com")
        cy.get( "[data-cy=password-login]" ).type("123456")

        cy.get( "[data-cy=submit-login]" ).click()

        cy.wait( 2000 )

    })

    it( "<ProjectList /> - Create a project", () => {

        // Revisamos que no haya proyectos
        cy.get( "[data-cy=project]" ).should("have.length", 0)
        
        // Sacamos la alerta
        cy.get( "[data-cy=add-project-btn]" ).click()
        cy.get( "[data-cy=projectName]" ).type("Test")
        cy.get( "[data-cy=addProject]" ).click()

        cy.wait( 2000 )

        // Revisamos que haya un proyecto
        cy.get( "[data-cy=project]" ).should("have.length", 1)

    })

    it('<Project /> - Delete a Project', () => {
        
        cy.get( "[data-cy=delete-project-btn]" ).click()

        cy.wait( 2000 )

        // Confirmamos la alerta
        cy.get("[data-cy=btn-confirmation-alert]").should("exist")
        cy.get("[data-cy=btn-confirmation-alert]").click()

        cy.wait( 1000 )

        cy.get( "[data-cy=project]" ).should("have.length", 0)

    })
    
    
    
})

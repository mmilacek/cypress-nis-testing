import { client } from '../../helpers/test-cases/client'

Cypress._.forEach(client.tests, test => {
    
    describe('TEST CASE: ' + test, () => {
    
        it('TEST: create', () => {
        
            cy.readFile('cypress/helpers/test-cases/' + test + '.json').then(data => {            
                cy
                    .get('.fa-handshake')
                    .click()

                    .get('.workspace-submenu')
                    .contains('Klienti')
                    .click()

                    .get('.btn-create')
                    .click();

                Cypress._.forEach(data.data, prop => {
                    switch(prop.type) {
                        case "select":
                            cy
                                .get(prop.id)
                                .select(prop.value)
                            
                            break

                        case "type":
                            cy
                                .get(prop.id)
                                .clear()
                                .type(prop.value)

                            break

                        case "date":
                            cy
                                .get(prop.id)
                                .clear()
                                .type(prop.value)

                            break

                        case "input-select":
                            cy
                                .get(prop.id)
                                .click()

                                .get(prop.field)
                                .type(prop.value)
                                
                                .wait(2000)
                                .type('{downarrow}{enter}{esc}')

                            break

                        case "multiselect":
                            cy
                                .get(prop.id)
                                .type(prop.value)

                                .wait(2000)
                                .type('{downarrow}{enter}')

                            break

                        default:
                            break
                    
                    }

                });

                cy
                    .get('.btn-save.btnSave')
                    .first()
                    .click();

                if(data.expected.fail == true){
                    cy
                        .get(data.expected.assert.element)
                        .contains(data.expected.assert.text)
                        .should('exist')

                    if(data.expected.after){
                        Cypress._.forEach(data.expected.after, step => {
                            if(step.action == "click"){ 
                                cy
                                    .get(step.element)
                                    .click({ force: true }) 
                            }
                        })
                    }
                }
            });
            
        });
        
        
    });
    
});
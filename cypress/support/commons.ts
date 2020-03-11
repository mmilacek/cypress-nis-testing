import * as _ from 'lodash';
import generateRandomString, { generateRandomFloat } from './utils';
import { list } from '../helpers/elements';

declare global {
    namespace Cypress {
        interface Chainable {
            checkEmpty: (form: any) => void;
            checkVisible: (form: any) => void;
            checkValue: (form: any, formAction: string) => void;
            checkReadonly: (form: any) => void;
            checkFilledReadonly: (form: any) => void;

            fillForm: (form: any, formAction: string) => void;

            checkListData: (form: any, formAction: string, shouldContain: string, rowCount: number) => void;
            filterBy: (form: any, formAction: string, rowCount: number) => void;
        }
    }
}

export const placeholderMethod = () => {};

Cypress.Commands.add('checkEmpty', form => {
    _.forEach(form, item => {
        cy.get(item.id).should('be.empty');
    });
});

Cypress.Commands.add('checkVisible', form => {
    _.forEach(form, item => {
        cy.get(item).should('be.visible');
    });
});

Cypress.Commands.add('checkValue', (form: any, formAction: string) => {
    _.forEach(form, item => {
        if(item.type == 'input'){
            cy.get(item.id).should('have.value', formAction == 'create' ? item.formValueCreate : item.formValueUpdate);
        }
    });
});

Cypress.Commands.add('checkReadonly', form => {
    _.forEach(form, item => {
        if(item.type == 'readonly'){
            cy.get(item.id).should('have.attr', item.type);
        }
    });
});

Cypress.Commands.add('checkFilledReadonly', form => {
    _.forEach(form, item => {
        if(item.type == 'readonly'){
            cy.get(item.id).should('not.have.value', '');
        }
    });
});

Cypress.Commands.add('fillForm', (form: any, formAction: string) => {
    _.forEach(form, item => {
        if(item.type == 'input'){
            cy.get(item.id).clear().type(formAction == 'create' ? item.formValueCreate : item.formValueUpdate);
        }
    });
});

Cypress.Commands.add('checkListData', (form: any, formAction: string, shouldContain: string, rowCount: number) => {
    cy.get('table').find('tbody').find('tr').as('row');
    cy.get('@row').its('length').should('eq', rowCount);
    
    _.forEach(form, item => {
        if(item.inList){
            cy.get('@row').should(shouldContain, formAction == 'create' ? item.formValueCreate : item.formValueUpdate)
        }
    })
});

Cypress.Commands.add('filterBy', (form: any, formAction: string, rowCount: number) => {
    _.forEach(form, item => {
        if(item.filter){
            cy.get(list.filter.search).clear().type((formAction == 'create' ? item.formValueCreate : item.formValueCreate + ' ' + item.formValueUpdate) + '{enter}');
            cy.wait(1000);

            cy.checkListData(form, formAction, 'contain.text', rowCount);
        }
    });
});




import generateRandomString, { generateRandomFloat, getAliasValue } from '../support/utils';
import { form, agentPosition, list } from '../helpers/elements';

const navigate = agentPosition.navigate;
const props = agentPosition.props;

const aliasCreate = getAliasValue(props, 'create');
const aliasUpdate = getAliasValue(props, 'update');

describe('TEST: agent/position/create', () => {
    beforeEach(() => {
        /*** navigate to form ***/
            cy.navigateToSub(navigate.menu, navigate.submenu);
    })

    it('TEST: create', () => {
        /*** navigate to form ***/
            cy.create();

        /*** check values before fill in ***/
            cy.checkEmpty(props);

        /*** check read-only fields ***/
            cy.checkReadonly(props);

        /*** fill the form in ***/
            cy.fillForm(props, 'create');

        /*** submit the form ***/
            cy.submitForm(true);

        /*** check values after submit ***/
            cy.checkFilledReadonly(props);
            cy.checkValue(props, 'create');

        /*** check logs below form ***/
            cy.checkListData(props, 'create', 'contain.text', 2);

        /*** check created item in list ***/
            cy.get('#id').then(($ident) => {
                /*** get item ID ***/
                    const ids = $ident.val();
                
                /*** filter logs ***/
                    cy.filterBy(props, 'create', 1);
                
                /*** filter by ID ***/
                    cy.get(form.general.back).click();
                    cy.get(list.filter.byId).type(ids + '{enter}');
                    cy.wait(1000);
                    
                    cy.checkListData(props, 'create', 'contain.text', 1);
                
                /*** filter by name ***/
                    cy.get(list.filter.byId).clear();
                    cy.get(list.filter.search).type(aliasCreate + '{enter}');
                    cy.wait(1000);

                    cy.checkListData(props, 'create', 'contain.text', 1);
            })

    })

    it('TEST: validations', () => {
        /*** navigate to form ***/
            cy.create();

        /*** submit the form ***/
            cy.submitForm(false);

        /*** fill shortName in ***/
            const shortName = generateRandomString(7);
            cy.get(props.short_name.id).type(shortName);

        /*** submit the form ***/
            cy.submitForm(false);

        /*** fill name in ***/
            const name = generateRandomString(8);
            cy.get(props.name.id).type(name);

        /*** submit the form ***/
            cy.submitForm(false);
    })

    it('TEST: values', () => {
        /*** navigate to form ***/
            cy.create();

        /*** fill the form in (short_name lenght is over 7) ***/
            let shortName = generateRandomString(10);
            cy.get(props.short_name.id).type(shortName);

            const name = generateRandomString(8);
            cy.get(props.name.id).type(name);

            var bankUnitValue = generateRandomFloat();
            cy.get(props.bank_unit_value.id).type(bankUnitValue);

        /*** submit the form ***/
            cy.submitForm(false);
            
            cy.get(form.message.submitFail).should('exist').contains(form.message.validateText);
            cy.get(form.message.validate).contains('Hodnota pola short name nesmie byť väčšia ako 7 characters.');

        /*** fill the form in (short_name lenght is  7) ***/
            shortName = generateRandomString(7);
            cy.get(props.short_name.id).clear().type(shortName);

            bankUnitValue = generateRandomString(7);
            cy.get(props.bank_unit_value.id).clear().type(bankUnitValue);

        /*** submit the form ***/
            cy.submitForm(true);

            cy.get(props.bank_unit_value.id).should('have.value', '0.00');
    })

    it('TEST: buttons', () => {
        /*** navigate to form ***/
            cy.create();

        /*** fill the form in ***/
            cy.fillForm(props, 'create');

        /*** clean the form ***/
            cy.get(form.general.create).click();

        /*** check values after clean up ***/
            cy.checkEmpty(props);

        /*** back to list ***/
            cy.get(form.general.back).first().click();
            cy.get(list.filter.search).should('exist');
    })
})

describe('TEST: agent/position/update', () => {
    it('TEST: update', () => {
        /*** create item ***/
            cy.createItem(props);

        cy.get('#id').then(($ident) => {
            /*** get item ID ***/
                const ids = $ident.val();

            /*** update data ***/
                cy.fillForm(props, 'update');

            /*** submit the form ***/
                cy.submitForm(true);

            /*** check logs below form ***/
                cy.checkListData(props, 'update', 'contain.text', 3);

            /*** filter logs ***/
                cy.filterBy(props, 'create', 2);
                cy.filterBy(props, 'update', 1);

            /*** filter by ID ***/
                cy.get(form.general.back).click();
                cy.get(list.filter.byId).type(ids + '{enter}');
                cy.wait(1000);
                
                cy.checkListData(props, 'update', 'contain.text', 1);
                cy.checkListData(props, 'create', 'not.contain.text', 1);
        
            /*** filter by name ***/
                cy.get(list.filter.byId).clear();
                cy.get(list.filter.search).type(aliasUpdate + '{enter}');
                cy.wait(1000);

                cy.checkListData(props, 'update', 'contain.text', 1);
                cy.checkListData(props, 'create', 'not.contain.text', 1);

        })
    })
})




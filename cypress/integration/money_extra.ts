import generateRandomString, { generateRandomFloat, getAliasValue } from '../support/utils';
import { form, moneyExtra, list } from '../helpers/elements';

const navigate = moneyExtra.navigate;
const props = moneyExtra.props;

const aliasCreate = getAliasValue(props, 'create');
const aliasUpdate = getAliasValue(props, 'update');

describe('TEST: money/extra/create', () => {
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

    it('TEST: history', () => {
        /*** navigate to form ***/
            cy.create();

        /*** fill the form in ***/
            cy.fillForm(props, 'create');

        /*** submit the form ***/
            cy.submitForm(true);

        /*** navigate to history ***/
            cy.get(form.extended.history).click();
            cy.wait(1000);

        /*** check data in history list */
            cy.checkListData(props, 'create', 'contain.text', 1);
    })

    it('TEST: validations', () => {
        /*** navigate to form ***/
            cy.create();

        /*** submit the form ***/
            cy.submitForm(false);

        /*** fill shortName in ***/
            const value = generateRandomFloat();
            cy.get(props.value.id).type(value);

        /*** submit the form ***/
            cy.submitForm(false);

            cy.get(form.message.submitFail).should('exist').contains(form.message.validateText);
            cy.get(form.message.validate).contains('Pole agent id je vyžadované.');

    })

    it('TEST: values', () => {
        /*** navigate to form ***/
            cy.create();

        /*** fill the form in (short_name lenght is over 7) ***/
            const value = '100001';
            cy.get(props.value.id).type(value);

            const agent = generateRandomString(8);
            cy.get(props.agent.id).type(agent).wait(1000);

        /*** submit the form ***/
            cy.submitForm(false);
            
            cy.get(form.message.submitFail).should('exist').contains(form.message.validateText);
            cy.get(form.message.validate).contains('Pole agent id je vyžadované.');
            cy.get(form.message.validate).contains('Hodnota pola value musí byť medzi -100000 and 100000.00.');

    })

    it('TEST: buttons', () => {
        /*** navigate to form ***/
            cy.create();

        /*** fill the form in ***/
            cy.fillForm(props, 'create');

        /*** clean the form ***/
            cy.get(form.list.create).click();

        /*** check values after clean up ***/
            cy.checkEmpty(props);

        /*** back to list ***/
            cy.get(form.general.back).first().click();
            cy.get(list.filter.search).should('exist');
    })
})

describe('TEST: agent/position/update', () => {
    beforeEach(() => {
        /*** navigate to form ***/
            cy.navigateToSub(navigate.menu, navigate.submenu);
    })

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

    it('TEST: history', () => {
        /*** navigate to form ***/
            cy.create();

        /*** create - fill the form in ***/
            cy.fillForm(props, 'create');

        /*** submit the form ***/
            cy.submitForm(true);

        /*** update - fill the form in ***/
            cy.fillForm(props, 'update');

        /*** submit the form ***/
            cy.submitForm(true);

        /*** navigate to history ***/
            cy.get(form.extended.history).click();
            cy.wait(1000);

        /*** check data in history list */
            cy.checkListData(props, 'create', 'contain.text', 2);
            cy.checkListData(props, 'update', 'contain.text', 2);

        /*** create - filter by alias ***/
            cy.get(list.filter.search).clear().type(aliasCreate + '{enter}');
            cy.wait(1000);

            cy.checkListData(props, 'create', 'contain.text', 1);
            cy.checkListData(props, 'update', 'not.contain.text', 1);

        /*** update - filter by alias ***/
            cy.get(list.filter.search).clear().type(aliasUpdate + '{enter}');
            cy.wait(1000);

            cy.checkListData(props, 'update', 'contain.text', 1);
            cy.checkListData(props, 'create', 'not.contain.text', 1);
    })
})






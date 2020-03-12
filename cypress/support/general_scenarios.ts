import { login, form } from '../helpers/elements';

declare global {
    namespace Cypress {
        interface Chainable {
            login: typeof placeholderMethod;
            logout: typeof placeholderMethod;

            navigateToSub: (menuName: string, subMenuName: string) => void;

            create: typeof placeholderMethod;
            submitForm: (submitSuccess: boolean) => void;

            createItem: (props: any) => void;
        }
    }
}

export const placeholderMethod = () => {};

Cypress.Commands.add('login', () => {
    cy.visit('/');

    const username = Cypress.env('username');
    const password = Cypress.env('password');

    expect(username, 'username was set').to.be.a('string').and.not.be.empty
    
    if (typeof password !== 'string' || !password) {
        throw new Error('Missing password value!')
    }

    cy.get('#frm-signInForm').within(($form) => {
        cy.get(login.username).type(username);
        cy.get(login.password).type(password, { log: true });

        cy.root().submit();
    })

    cy.get(login.logout).should('exist');
    cy.getCookie('nis_session').should('exist')
});

Cypress.Commands.add('logout', () => {
    cy.get(login.logout).click();

    cy.get(login.username).should('exist');
});

Cypress.Commands.add('navigateToSub', (menuName: string, subMenuName: string) => {
    cy.get(menuName).click();
    cy.get('.sub-menu').contains(subMenuName).click();
});

Cypress.Commands.add('create', () => {
    cy.get(form.general.create).click();
    cy.url().should('include', '/create');

    cy.checkVisible(form.general);
});

Cypress.Commands.add('submitForm', (submitSuccess: boolean) => {
    cy.get(form.general.submit).click();
    
    if(submitSuccess){ 
        cy.get(form.message.submitSuccess).should('exist').contains(form.message.submitSuccessText); 
        cy.url().should('include', '/detail/');

    }else{ cy.get(form.message.submitSuccess).should('not.exist'); }
});

Cypress.Commands.add('createItem', (props: any) => {
    /*** navigate to form ***/
        cy.create();

    /*** fill the form in ***/
        cy.fillForm(props, 'create');

    /*** submit the form ***/
        cy.submitForm(true);
});






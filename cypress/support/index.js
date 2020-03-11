import 'cypress-xpath';

import './commons.ts';
import './general_scenarios.ts';

import './utils.ts';

Cypress.Screenshot.defaults({
    screenshotOnRunFailure: false
});

before(function(){
    cy.clearCookie('nis_session');
    cy.login();
});

Cypress.Cookies.defaults({
    whitelist: 'nis_session'
});

after(function(){
    cy.logout();
});





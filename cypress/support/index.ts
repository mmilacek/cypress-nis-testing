import './commons.ts';
import './general_scenarios.ts';

import './utils.ts';

import '@shelex/cypress-allure-plugin';

require('cypress-failed-log');
require('@shelex/cypress-allure-plugin');

Cypress.Screenshot.defaults({ screenshotOnRunFailure: false });

before(function(){
    cy.clearCookie('nis_session');
    cy.login();
});

Cypress.Cookies.defaults({ whitelist: 'nis_session' });

after(function(){
    //cy.logout();
});





import './commons.ts';
import './general_scenarios.ts';

import './utils.ts';

require('cypress-failed-log');

Cypress.Screenshot.defaults({ screenshotOnRunFailure: true });

before(function(){
    cy.clearCookie('nis_session');
    cy.login();
});

Cypress.Cookies.defaults({ whitelist: 'nis_session' });

after(function(){
    cy.logout();
});





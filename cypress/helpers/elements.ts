import generateRandomString, { generateRandomFloat } from "../support/utils";

export const login = {
    username: '#frmsignInForm-username',
    password: '#frmsignInForm-password',
    button: '#frmsignInForm-login',

    logout: '.fa.fa-sign-out'
};

export const list = {
    filter: {
        byId: '[data-model="id"] > input',
        search: '[type="search"]'
    }
};

export const form = {
    general: {
        header: 'h1.col-sm-6',
        
        bookmark: '#quick-menu > :nth-child(1) > a > .fa',
        create: '.fa.fa-plus-square',

        back: ':nth-child(1) > .btn',
        submit: 'button[name="action[save]"]',
    },

    message: {
        submitSuccess: '.alert.alert-success',
        submitSuccessText: 'Dáta boli úspečne uložené.',

        submitFail: '.alert.alert-danger',
        submitFailText: 'Vyznačené polia majú chybný vstup.',

        validate: '.text-danger',
        validateText: 'Vyznačené polia majú chybný vstup.'
    }
};

export const agentStatus = {
    navigate: {
        menu: '.fa.fa-briefcase',
        submenu: 'Agent_status'
    },

    options: {
        logs: false
    },

    props: {
        id: {
            id: '#id', 
            type: 'readonly'
        },
        
        short_name: {
            id: '#short_name', 
            type: 'input',
            inList: true,
            formValueCreate: generateRandomString(7),
            formValueUpdate: generateRandomString(7)
        },
        
        name: {
            id: '#name', 
            type: 'input',
            alias: true,
            inList: true,
            formValueCreate: generateRandomString(8),
            formValueUpdate: generateRandomString(8)
        }
    }
};

export var agentPosition = {
    navigate: {
        menu: '.fa.fa-briefcase',
        submenu: 'Agent_position',
    },

    options: {
        logs: true
    },

    props: {
        id: {
            id: '#id', 
            type: 'readonly'
        },
        
        short_name: {
            id: '#short_name', 
            type: 'input',
            inList: true,
            filter: true, 
            formValueCreate: generateRandomString(7),
            formValueUpdate: generateRandomString(7)
        },
        
        name: {
            id: '#name', 
            type: 'input',
            alias: true,
            inList: true,
            filter: true, 
            formValueCreate: generateRandomString(8),
            formValueUpdate: generateRandomString(8)
        },
        
        bank_unit_value: {
            id: '#bank_unit_value', 
            type: 'input',
            inList: true,
            filter: true, 
            formValueCreate: generateRandomFloat(),
            formValueUpdate: generateRandomFloat()
        },
        
        id_old_mlm: {
            id: '#id_old_mlm', 
            type: 'readonly'
        }
    }
};
const APP_URL = 'http://localhost:4200/';
const APP_LOGIN_URL = APP_URL + 'auth/login';
const APP_SIGNUP_URL = APP_URL + 'auth/signup';


it('Correct Data', () => {
  cy.visit(APP_SIGNUP_URL)
    .get('#firstName').type('ammar')
    .get('#lastName').type('alhasan')
    .get('#username').type('ammar.rbm@gmail.com')
    .get('#password').type('123')
    .get('#submit').click()
    .get('.mat-simple-snackbar > :nth-child(1)')
    .should("have.text", "Your account created successfully")
    .url().should('include', APP_LOGIN_URL)
});


it('Email already exists', () => {
  cy.visit(APP_SIGNUP_URL)
    .get('#firstName').type('ammar')
    .get('#lastName').type('alhasan')
    .get('#username').type('ammar.rbm@gmail.com')
    .get('#password').type('123')
    .get('#submit').click()
    .url().should('include', APP_LOGIN_URL)

  cy.visit(APP_SIGNUP_URL)
    .get('#firstName').type('ammar')
    .get('#lastName').type('alhasan')
    .get('#username').type('ammar.rbm@gmail.com')
    .get('#password').type('123')
    .get('#submit').click()
    .get('.mat-simple-snackbar > :nth-child(1)')
    .should("have.text", "username already exists")
    .url().should('include', APP_SIGNUP_URL)
});

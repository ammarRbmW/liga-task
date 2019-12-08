const APP_URL = 'http://localhost:4200/';
const APP_LOGIN_URL = APP_URL + 'auth/login';
const APP_SIGNUP_URL = APP_URL + 'auth/signup';


beforeEach(function () {
  cy.visit(APP_SIGNUP_URL)
    .get('#firstName').type('ammar')
    .get('#lastName').type('alhasan')
    .get('#username').type('ammar.rbm@gmail.com')
    .get('#password').type('123')
    .get('#submit').click()
    .url().should('include', APP_LOGIN_URL)
})

it('Correct Email && Password', () => {
  cy.visit(APP_LOGIN_URL)
    .get('#username').type('ammar.rbm@gmail.com')
    .get('#password').type('123')
    .get('#submit').click()
    .get('.mat-simple-snackbar > :nth-child(1)')
    .should("have.text", "Signed in successfully")
    .url().should('include', APP_URL + 'articles')
});


it('Incorrect Email', () => {
  cy.visit(APP_LOGIN_URL)
    .get('#username').type('ammar@rbm1@gmail.com')
    .get('#password').type('123')
    .get('#submit').click()
    .get('.mat-simple-snackbar > :nth-child(1)')
    .should("have.text", "The user not found, sign up please.")
  //
});


it('Incorrect Password', () => {
  cy.visit(APP_LOGIN_URL)
    .get('#username').type('ammar.rbm@gmail.com')
    .get('#password').type('1')
    .get('#submit').click()
    .get('.mat-simple-snackbar > :nth-child(1)')
    .should("have.text", "Username or password not correct")
});

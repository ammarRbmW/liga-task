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

  cy.visit(APP_LOGIN_URL)
    .get('#username').type('ammar.rbm@gmail.com')
    .get('#password').type('123')
    .get('#submit').click()
    .url().should('include', APP_URL + 'articles')
})


// it('Create New Article', () => {
//   cy.visit(APP_URL + 'articles')
//     .get('#add-new-item').click()
//     .url().should('include', APP_URL + 'articles/create')
//     .get('#title').type('title')
//     .get('.ql-editor > p').type('content')
//     .get('#mat-input-0').type('12/8/2019')
//     .get('input[type=file]')
//     .uploadFile('6-200x200.jpg')
//     .get('.mat-raised-button > .mat-button-wrapper').click()
//     .url().should('include', APP_URL + 'articles')
//     .get('.mat-simple-snackbar > :nth-child(1)')
//     .should("have.text", "Item created successfully.")
// });

it('Delete Article', () => {
  cy.visit(APP_URL + 'articles')
    .get(':nth-child(1) > .cdk-column-action > .delete-icon > .mat-icon')
    .click()
    .get('.mat-typography h3')
    .should("have.text", "Are you sure you want to delete this item?")
    .get('.mat-raised-button > .mat-button-wrapper')
    .click()
    .get('.mat-simple-snackbar > :nth-child(1)')
    .should("have.text", "Item deleted successfully.")
  // .url().should('include', APP_URL + 'articles/create')
  // .get('#title').type('title')
  // .get('.ql-editor > p').type('content')
  // .get('#mat-input-0').type('12/8/2019')
  // .get('input[type=file]')
  // .uploadFile('6-200x200.jpg')
  // .get('.mat-raised-button > .mat-button-wrapper').click()
  // .url().should('include', APP_URL + 'articles')
  // .get('.mat-simple-snackbar > :nth-child(1)')
  // .should("have.text", "Item created successfully.")
});


Cypress.Commands.add('uploadFile', {prevSubject: true}, (subject, fileName) => {
  cy.fixture(fileName).then((content) => {
    const el = subject[0]
    const testFile = new File([content], fileName)
    const dataTransfer = new DataTransfer()

    dataTransfer.items.add(testFile)
    el.files = dataTransfer.files
    cy.wrap(subject).trigger('change', {force: true})
  })
})

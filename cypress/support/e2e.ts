// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      getSignInTokenInMail(): Chainable<Response<string>>;
      loadSession(email: string): Chainable<unknown>;
      clearDB(): Chainable<unknown>;
      prepareUser(email?: string): Chainable<unknown>;
      seedUsers(count: number, activated?: boolean): Chainable<unknown>;
      prepareAdmin(): Chainable<unknown>;
      seedAdmin(): Chainable<unknown>;
      seedBooks(count: number, chaptersCount?: number): Chainable<unknown>;
      seedQuestions(
        count: number,
        questionsCount?: number,
        answersCount?: number
      ): Chainable<unknown>;
      assignBooksToStudents(): Chainable<unknown>;
    }
  }
}

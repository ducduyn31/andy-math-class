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
import Bluebird from "cypress/types/bluebird";

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      getLastLoginEmail(): Chainable<Response<string>>;
      loadUserSession(): Chainable<unknown>;
      loadAdminSession(): Chainable<unknown>;
      clearAuthDB(): Chainable<unknown>;
      prepareUser(): Chainable<unknown>;
      prepareAdmin(): Chainable<unknown>;
    }
  }
}

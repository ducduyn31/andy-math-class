/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import "./auth";
import "./books";
import "./questions";
import { clearAuthDB } from "./auth/db";
import { clearBooksTable } from "./books/db";
import { clearQuestionsTable } from "./questions/db";

const supabaseDomain = Cypress.env("SUPABASE_URL");
const supabaseSvcRoleKey = Cypress.env("SUPABASE_KEY");

Cypress.Commands.add("clearDB", () => {
  const authSchemaDelete = new Cypress.Promise((resolve) => {
    clearAuthDB(supabaseDomain, supabaseSvcRoleKey).then(() => {
      resolve();
    });
  });

  const booksSchemaDelete = new Cypress.Promise((resolve) => {
    clearBooksTable(supabaseDomain, supabaseSvcRoleKey).then(() => {
      resolve();
    });
  });

  const questionsSchemaDelete = new Cypress.Promise((resolve) => {
    clearQuestionsTable(supabaseDomain, supabaseSvcRoleKey).then(() => {
      resolve();
    });
  });

  return cy
    .wrap(
      Promise.all([authSchemaDelete, booksSchemaDelete, questionsSchemaDelete])
    )
    .then(() => {
      cy.log("All tables cleared");
    });
});

Cypress.Commands.add("toggleOffSideBarIfOn", () => {
  cy.get('[data-testid="sidebar-toggle-off"]').then(($sidebar) => {
    if ($sidebar.is(":visible")) {
      cy.get('[data-testid="sidebar-toggle"]').click();
    }
  });
});

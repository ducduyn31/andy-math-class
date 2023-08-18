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

import { createClient } from "@supabase/supabase-js";
import { getLastLoginEmail, loadSession, login } from "./auth/login";
import { faker } from "@faker-js/faker";

const supabaseDomain = Cypress.env("SUPABASE_URL");
const supabaseSvcRoleKey = Cypress.env("SUPABASE_KEY");

Cypress.Commands.add("getLastLoginEmail", () =>
  getLastLoginEmail("e2e@example.com")
);

Cypress.Commands.add("loadUserSession", () => loadSession("e2e@example.com"));

Cypress.Commands.add("loadAdminSession", () => loadSession("e2e@example.com"));

Cypress.Commands.add("prepareUser", (email?: string) => {
  login(email ?? "e2e@example.com");
});

Cypress.Commands.add("prepareAdmin", () => {
  login("e2e-admin@example.com").then(() => {
    const supabase = createClient(supabaseDomain, supabaseSvcRoleKey, {
      db: {
        schema: "next_auth",
      },
    });
    const userUpdate = new Cypress.Promise((resolve) => {
      const response = supabase
        .from("users")
        .update({ isAdmin: true })
        .eq("email", "e2e-admin@example.com")
        .then((response) => response.count);

      resolve(response);
    });
    return cy.wrap(userUpdate).then(() => {
      cy.log("Admin updated");
    });
  });
});

Cypress.Commands.add("clearAuthDB", () => {
  const supabase = createClient(supabaseDomain, supabaseSvcRoleKey, {
    db: {
      schema: "next_auth",
    },
  });
  const sessionDelete = new Cypress.Promise((resolve) => {
    const response = supabase
      .from("sessions")
      .delete()
      .neq("sessionToken", "0")
      .then((response) => response.count);
    resolve(response);
  });
  const userDelete = new Cypress.Promise((resolve) => {
    const response = supabase
      .from("users")
      .delete()
      .neq("email", "")
      .then((response) => response.count);

    resolve(response);
  });

  return cy.wrap(Promise.all([sessionDelete, userDelete])).then(() => {
    cy.log("All tables cleared");
  });
});

Cypress.Commands.add("seedUsers", (count: number) => {
  const supabase = createClient(supabaseDomain, supabaseSvcRoleKey, {
    db: {
      schema: "next_auth",
    },
  });
  const userInsert = new Cypress.Promise((resolve) => {
    const response = supabase
      .from("users")
      .insert(
        Array.from({ length: count }, (_, i) => ({
          email: `e2e-user-${i + 1}@example.com`,
          emailVerified: "now()",
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          isAdmin: false,
          isEnabled: true,
        }))
      )
      .then((response) => response.count);

    resolve(response);
  });

  return cy.wrap(userInsert).then(() => {
    cy.log("Users seeded");
  });
});

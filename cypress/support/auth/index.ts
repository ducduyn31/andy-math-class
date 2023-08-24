import { getSignInTokenInMail, loadSession, login } from "./login";
import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";

const supabaseDomain = Cypress.env("SUPABASE_URL");
const supabaseSvcRoleKey = Cypress.env("SUPABASE_KEY");

Cypress.Commands.add("getSignInTokenInMail", () =>
  getSignInTokenInMail("e2e@example.com")
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

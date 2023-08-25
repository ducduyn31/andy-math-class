import { getSignInTokenInMail, loadSession, login } from "./login";
import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";

const supabaseDomain = Cypress.env("SUPABASE_URL");
const supabaseSvcRoleKey = Cypress.env("SUPABASE_KEY");

Cypress.Commands.add("getSignInTokenInMail", () =>
  getSignInTokenInMail("e2e@example.com")
);

Cypress.Commands.add("loadSession", (email) => loadSession(email));

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

Cypress.Commands.add("seedUsers", (count: number, activated = true) => {
  const supabase = createClient(supabaseDomain, supabaseSvcRoleKey, {
    db: {
      schema: "next_auth",
    },
  });
  const userInsert = new Cypress.Promise(async (resolve) => {
    const response = await supabase
      .from("users")
      .insert(
        Array.from({ length: count }, (_, i) => ({
          email: `e2e-user-${i + 1}@example.com`,
          emailVerified: "now()",
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          isAdmin: false,
          isEnabled: activated,
        }))
      )
      .select("id");

    const userIds: string[] | undefined = response.data?.map((user) => user.id);
    const neverExpiredTimestamp = new Date(9999, 0).toISOString();

    const sessions = await supabase
      .from("sessions")
      .insert(
        userIds?.map((userId) => ({
          sessionToken: faker.string.uuid(),
          userId,
          expires: neverExpiredTimestamp,
        }))
      )
      .select("sessionToken");

    resolve(sessions);
  });

  return cy.wrap(userInsert).then(() => {
    cy.log("Users seeded");
  });
});

Cypress.Commands.add("seedAdmin", () => {
  const supabase = createClient(supabaseDomain, supabaseSvcRoleKey, {
    db: {
      schema: "next_auth",
    },
  });
  const adminInsert = new Cypress.Promise(async (resolve) => {
    const response = await supabase
      .from("users")
      .insert({
        email: `e2e-admin@example.com`,
        emailVerified: "now()",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        isAdmin: true,
        isEnabled: true,
      })
      .select("id");

    const neverExpiredTimestamp = new Date(9999, 0).toISOString();

    const session = await supabase
      .from("sessions")
      .insert({
        sessionToken: faker.string.uuid(),
        userId: response.data?.[0]?.id,
        expires: neverExpiredTimestamp,
      })
      .select("sessionToken");

    resolve(session);
  });

  cy.wrap(adminInsert).then(() => {
    cy.log("Admin seeded");
  });
});

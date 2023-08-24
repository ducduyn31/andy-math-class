import { createClient } from "@supabase/supabase-js";

const token = Cypress.env("MAILTRAP_TOKEN");
const accountId = Cypress.env("MAILTRAP_ACCOUNT_ID");
const inboxId = Cypress.env("MAILTRAP_INBOX_ID");
const supabaseDomain = Cypress.env("SUPABASE_URL");
const supabaseSvcRoleKey = Cypress.env("SUPABASE_KEY");

export const getSignInTokenInMail = (email: string) =>
  cy
    .request({
      method: "GET",
      url: `https://mailtrap.io/api/accounts/${accountId}/inboxes/${inboxId}/messages`,
      qs: {
        search: email,
      },
      headers: {
        "Api-Token": token,
      },
    })
    .then((response) => {
      const emails = response.body;
      cy.log(`Received ${emails.length} emails`);

      expect(emails.length).to.be.greaterThan(0);

      const lastEmail = emails[0];
      const lastEmailContent = lastEmail.txt_path;

      return cy.request({
        method: "GET",
        url: `https://mailtrap.io${lastEmailContent}`,
        headers: {
          "Api-Token": token,
        },
      });
    });

export const loadSession = (email: string) => {
  const supabase = createClient(supabaseDomain, supabaseSvcRoleKey, {
    db: {
      schema: "next_auth",
    },
  });
  const sessionToken = new Cypress.Promise((resolve) => {
    const token = supabase
      .from("sessions")
      .select("sessionToken, users(email)")
      .eq("users.email", email)
      .order("expires", { ascending: false })
      .limit(1)
      .then((response) => {
        return response.data?.[0]?.sessionToken;
      });
    resolve(token);
  });

  return cy.wrap(sessionToken).then((token) => {
    expect(token).to.not.be.null;
    cy.log(token as string);
    cy.setCookie("next-auth.session-token", token as string, {
      secure: true,
    });
  });
};

export const login = (email: string) => {
  cy.visit("localhost:3000/login");
  cy.get('input[placeholder="Type here"]').type(email);
  cy.get('button[type="submit"]').click();
  cy.wait(4000);
  return getSignInTokenInMail(email).then((content) => {
    const body = content.body;
    const link = body.match(/http:\/\/localhost:3000.*example.com/gm)?.[0];
    cy.visit(link!);
    cy.get('input[name="firstName"]').type("E2E");
    cy.get('input[name="lastName"]').type("Test");
    cy.get('button[type="submit"]').click();
  });
};

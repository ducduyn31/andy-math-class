before(() => {
  cy.clearDB();
});

describe("should authenticate user", () => {
  it("should redirect to login page when not logged in", () => {
    cy.visit("localhost:3000");
    cy.url().should("include", "/login");
    cy.contains("Login").should("be.visible");
  });

  it("should login user", () => {
    cy.visit("localhost:3000/login");
    const email = "e2e@example.com";
    cy.get('input[placeholder="Type here"]')
      .type(email)
      .should("have.value", email);
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.contains("Check your email").should("be.visible");
  });

  it("should send an email containing a verification link", () => {
    cy.getSignInTokenInMail().then((content) => {
      const body = content.body;
      const link = body.match(/http:\/\/localhost:3000.*example.com/gm)?.[0];

      expect(link).to.contains("/api/auth/callback/email");
      cy.visit(link!);
      cy.contains(`Complete your Sign up`).should("be.visible");
      cy.reload();
      cy.contains(`Complete your Sign up`).should("be.visible");
    });
  });

  it("should fill first name and last name", () => {
    cy.loadSession("e2e@example.com");
    cy.visit("localhost:3000");
    cy.url().should("include", "/register");
    cy.get('input[name="firstName"]').type("E2E");
    cy.get('input[name="lastName"]').type("Test");
    cy.get('button[type="submit"]').click();
  });
});

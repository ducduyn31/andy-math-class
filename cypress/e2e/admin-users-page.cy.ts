before(() => {
  cy.clearAuthDB();
  cy.prepareAdmin();
});

beforeEach(() => {
  cy.loadAdminSession();
});

describe("Admin Users Page", () => {
  it("should load the page and redirect to users page", async () => {
    cy.visit("localhost:3000/admin");
    cy.url().should("include", "/users");
  });
});

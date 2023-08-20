before(() => {
  cy.clearDB();
  cy.seedUsers(10);
  cy.prepareAdmin();
});

beforeEach(() => {
  cy.loadAdminSession();
});

describe("Admin Users Page", () => {
  it("should load the page and redirect to users page", () => {
    cy.visit("localhost:3000/admin");
    cy.url().should("include", "/users");
  });

  it("should have 11 seeded users", () => {
    cy.visit("localhost:3000/admin/users");
    cy.get(".stat-value").contains("11");
  });

  it("should have 10 users in first page and 1 user in second page", () => {
    cy.visit("localhost:3000/admin/users");
    cy.get('[data-testid="user-entry"]').should("have.length", 10);
    cy.get('[data-title="2"]').click();
    cy.get('[data-testid="user-entry"]').should("have.length", 1);
  });

  it("should be able to disable a user", () => {
    cy.visit("localhost:3000/admin/users");
    cy.get('[data-testid="user-entry"]')
      .first()
      .within(() => {
        cy.get("td")
          .eq(3)
          .within(() => {
            cy.get(".toggle").should("be.checked");
            cy.get(".toggle").click();
            cy.get(".toggle").should("not.be.checked");
          });
      });
  });

  it("should be able to edit a user", () => {
    cy.visit("localhost:3000/admin/users");
    cy.get('[data-testid="user-entry"]')
      .first()
      .within(() => {
        cy.get("td").eq(2).click();
        cy.get("td").eq(2).click();
      });
    cy.get(".modal-box").should("be.visible");
    cy.get("input[name='firstName']").clear().type("E2E-Modified");
    cy.get("input[name='lastName']").clear().type("User");

    cy.contains("Save").click();

    cy.contains("E2E-Modified User");
  });

  it("should cancel user modification when cancel is clicked", () => {
    cy.visit("localhost:3000/admin/users");
    cy.get('[data-testid="user-entry"]')
      .first()
      .within(() => {
        cy.get("td").eq(2).click();
        cy.get("td").eq(2).click();
      });
    cy.get(".modal-box").should("be.visible");
    cy.get("input[name='firstName']").clear().type("Should not");
    cy.get("input[name='lastName']").clear().type("Visible");

    cy.contains("Close").click();
    cy.wait(5000);
    cy.contains("Should not Visible").should("not.exist");
  });

  it("should show only 1 user when being filtered by email", () => {
    cy.visit("localhost:3000/admin/users");
    cy.get('[data-title="2"]').click();
    cy.get('[data-testid="user-entry"]').should("have.length", 1);

    cy.get('input[placeholder="Search by email"]').type("admin");
    cy.get("button").contains("Filter").click();
    cy.get('[data-testid="user-entry"]').should("have.length", 1);
    cy.contains("e2e-admin@example.com");

    cy.reload();
    cy.get('[data-testid="user-entry"]').should("have.length", 1);
    cy.contains("e2e-admin@example.com");

    cy.get("button").contains("Clear filter").click();
    cy.get('[data-testid="user-entry"]').should("have.length", 10);
    cy.get('[placeholder="Search by email"]').should("have.value", "");
    cy.get('select[name="book"]').should("have.value", "any");
    cy.get('select[name="status"]').should("have.value", "any");
  });
});

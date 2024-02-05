before(() => {
  cy.clearDB();
  cy.seedUsers(10);
  cy.seedAdmin();
});

beforeEach(() => {
  cy.loadSession("e2e-admin@example.com");
});

describe("Admin Users Page", () => {
  it("should load the page and redirect to users page", () => {
    cy.visit("localhost:3000/admin");
    cy.url().should("include", "/users");
  });

  it("should have 11 seeded users", () => {
    cy.visit("localhost:3000/admin/users");
    cy.contains(".stat-value", "11", {
      timeout: 10000,
    }).should("be.visible");
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
    cy.contains("Modify").click();
    cy.contains("Modify").click();

    cy.get(".modal-box").should("be.visible");

    cy.get("input[name='firstName']").clear().type("E2E-Modified");
    cy.get("input[name='lastName']").clear().type("User");

    cy.contains("Save").click();

    cy.contains("E2E-Modified User").should("be.visible");
  });

  it("should cancel user modification when cancel is clicked", () => {
    cy.visit("localhost:3000/admin/users");
    cy.contains("Modify").click();
    cy.contains("Modify").click();

    cy.get(".modal-box").should("be.visible");

    cy.get("input[name='firstName']").clear().type("Should not");
    cy.get("input[name='lastName']").clear().type("Visible");

    cy.contains(".btn", "Close").click();
    cy.contains("Should not Visible").should("not.exist");
  });

  it("should show only 1 user when being filtered by email", () => {
    cy.visit("localhost:3000/admin/users");

    cy.get('[data-testid="filter"]').click();
    cy.get('input[placeholder="Search by email"]').type("admin");
    cy.contains("button", "Filter").click();
    cy.get('[data-testid="user-entry"]').should("have.length", 1);
    cy.contains("e2e-admin@example.com").should("be.visible");

    cy.contains("button", "Clear filter").click();
    cy.get('[data-testid="user-entry"]').should("have.length", 11);
    cy.get('[placeholder="Search by email"]').should("have.value", "");
  });
});

describe.skip("User Book Assignment", () => {
  before(() => {
    cy.seedBooks(10);
    cy.assignBooksToStudents();
  });

  it("should not have any unassigned students", async () => {
    cy.visit("localhost:3000/admin/users");
    cy.contains(".stat-value", "11").should("be.visible");

    cy.contains("No book assigned").should("have.length.at.most", 1);
  });

  it("should be able to assign a book to user", async () => {
    cy.visit("localhost:3000/admin/users");
    cy.contains("Modify").click();
    cy.contains("Modify").click();

    cy.get(".modal-box").should("be.visible");
    cy.get('[data-testid="book-assignment"]').should("have.length", 10);

    cy.get('[data-testid="book-assignment"]')
      .first()
      .within(() => {
        cy.get("span")
          .invoke("text")
          .then((text) => {
            cy.wrap(text).as("bookName");
          });
      })
      .click();
    cy.contains("Save").click();

    cy.wait(1000);
    cy.get("@bookName").then((bookName) => {
      cy.contains(".badge", (bookName as unknown as string).trim()).should(
        "be.visible"
      );
    });
  });
});

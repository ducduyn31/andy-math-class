before(() => {
  cy.clearDB();
  cy.prepareAdmin();
  cy.seedBooks(10);
});

beforeEach(() => {
  cy.loadAdminSession();
});

describe("Admin Books Page", () => {
  it("should render books table", () => {
    cy.visit("localhost:3000/admin/books");

    cy.get('[data-testid="book-entry"]').should("have.length", 5);
    cy.get('[data-title="2"]').click();
    cy.get('[data-testid="book-entry"]').should("have.length", 5);
  });

  it("should be able to edit a book", () => {
    cy.visit("localhost:3000/admin/books");
    cy.get('[data-testid="book-entry"]')
      .first()
      .within(() => {
        cy.contains("Modify").click();
        cy.contains("Modify").click();
      });
    cy.get(".modal-box").should("be.visible");
    cy.get("input[name='name']").clear().type("E2E-Modified");
    cy.contains("Save").click();
    cy.contains("E2E-Modified");
  });

  it("should be able to filter a book by name", () => {
    cy.visit("localhost:3000/admin/books");
    cy.get("input[placeholder='Search by book name']")
      .clear()
      .type("E2E-Modified");
    cy.get("button").contains("Filter").click();
    cy.get('[data-testid="book-entry"]').should("have.length", 1);
    cy.reload();
    cy.get('[data-testid="book-entry"]').should("have.length", 1);
    cy.get("input[placeholder='Search by book name']").clear();
    cy.get("button").contains("Filter").click();
    cy.get('[data-testid="book-entry"]').should("have.length", 5);
  });

  it("should be able to delete a book", () => {
    cy.visit("localhost:3000/admin/books");
    cy.wait(2000);
    cy.get("input[placeholder='Search by book name']")
      .clear()
      .type("E2E-Modified");
    cy.get("button").contains("Filter").click();
    cy.get('[data-testid="book-entry"]').should("have.length", 1);
    cy.get('[data-testid="book-entry"]')
      .first()
      .within(() => {
        cy.contains("Remove").click();
      });
    cy.get('[data-testid="book-entry"]').should("have.length", 0);
  });
});

beforeEach(() => {
  cy.loadSession("e2e-admin@example.com");
});

describe("Admin Books Page", () => {
  before(() => {
    cy.clearDB();
    cy.seedAdmin();
    cy.seedBooks(10);
  });

  it("should render books table", () => {
    cy.visit("localhost:3000/admin/books");

    cy.contains(".stat", "Total books").within(() => {
      cy.contains(".stat-value", "10").should("be.visible");
    });

    cy.get('[data-testid="book-entry"]').should("have.length", 10);
  });

  it("should be able to edit a book", () => {
    cy.visit("localhost:3000/admin/books");
    cy.toggleOffSideBarIfOn();
    cy.get('[data-testid="book-entry"]')
      .first()
      .within(() => {
        cy.contains("Modify").click();
        cy.contains("Modify").click();
      });
    cy.get(".modal-box").should("be.visible");
    cy.get("input[name='name']").clear().type("E2E-Modified");
    cy.contains("Save").click();
    cy.contains("E2E-Modified").should("be.visible");
  });

  it("should be able to filter a book by name", () => {
    cy.visit("localhost:3000/admin/books");
    cy.toggleOffSideBarIfOn();

    cy.get('[data-testid="filter"]').click();
    cy.get("input[placeholder='Search by book name']")
      .clear()
      .type("E2E-Modified");
    cy.contains("button", "Filter").click();
    cy.get('[data-testid="book-entry"]').should("have.length", 1);
    cy.contains("button", "Clear filter").click();
    cy.get('[data-testid="book-entry"]').should("have.length", 10);
  });

  it("should be able to delete a book", () => {
    cy.visit("localhost:3000/admin/books");
    cy.toggleOffSideBarIfOn();

    cy.get('[data-testid="filter"]').click();
    cy.get("input[placeholder='Search by book name']")
      .clear()
      .type("E2E-Modified");
    cy.contains("button", "Filter").click();
    cy.get('[data-testid="book-entry"]').should("have.length", 1);
    cy.get('[data-testid="book-entry"]')
      .first()
      .within(() => {
        cy.contains("Remove").click();
      });
    cy.get('[data-testid="book-entry"]').should("have.length", 0);
  });
});

describe("Edit Chapters tests", () => {
  before(() => {
    cy.clearDB();
    cy.seedAdmin();
  });

  it("should render books table", () => {
    cy.visit("localhost:3000/admin/books");

    cy.get('[data-testid="book-entry"]').should("have.length", 0);
  });

  it("should be able to add a book", () => {
    cy.visit("localhost:3000/admin/books");
    cy.toggleOffSideBarIfOn();
    cy.contains("Add book").click();
    cy.contains("Add book").click();
    cy.get(".modal-box").should("be.visible");
    cy.get("input[name='name']").clear().type("E2E-Modified");
    cy.contains("Save").click();
    cy.contains("E2E-Modified").should("be.visible");
  });

  it("should be able to add a chapter", () => {
    cy.visit("localhost:3000/admin/books");
    cy.toggleOffSideBarIfOn();
    cy.contains("Modify").click();
    cy.contains("Modify").click();
    cy.get(".modal-box").should("be.visible");
    cy.contains("Add new chapter").click();
    cy.get("input[placeholder='Chapter ...']").clear().type("Chapter 1");
    cy.contains("Add Chapter").click();
    cy.contains("Add new chapter").click();
    cy.get("input[placeholder='Chapter ...']").clear().type("Chapter 3");
    cy.contains("Add Chapter").click();
    cy.contains("Add new chapter").click();
    cy.get("input[placeholder='Chapter ...']").clear().type("Chapter 2");
    cy.contains("Add Chapter").click();
    cy.contains("Save").click();

    cy.contains("Chapter 1").should("be.visible");
    cy.contains("Chapter 2").should("be.visible");
    cy.contains("Chapter 3").should("be.visible");
  });

  it("should be able to edit order of chapter", () => {
    cy.visit("localhost:3000/admin/books");
    cy.toggleOffSideBarIfOn();
    cy.contains("Modify").click();
    cy.contains("Modify").click();
    cy.get(".modal-box").should("be.visible");

    cy.get('[data-testid="chapter-entry"]').then(($elements) => {
      const orders = $elements
        .map((_, el) => {
          return el.innerText;
        })
        .get()
        .join(",");
      expect(orders).to.equal("Chapter 1,Chapter 3,Chapter 2");
    });

    cy.get('[data-testid="chapter-entry"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="move-chapter-down"]').click();
      });

    cy.contains("Save").click();
    cy.contains("Modify").click();
    cy.contains("Modify").click();
    cy.get('[data-testid="chapter-entry"]').then(($elements) => {
      const orders = $elements
        .map((_, el) => {
          return el.innerText;
        })
        .get()
        .join(",");
      expect(orders).to.equal("Chapter 1,Chapter 2,Chapter 3");
    });
  });

  it("should be able to delete chapters", () => {
    cy.visit("localhost:3000/admin/books");
    cy.toggleOffSideBarIfOn();
    cy.contains("Modify").click();
    cy.contains("Modify").click();
    cy.get(".modal-box").should("be.visible");

    cy.get('[data-testid="remove-chapter"]').first().click();
    cy.get('[data-testid="remove-chapter"]').first().click();
    cy.get('[data-testid="remove-chapter"]').first().click();

    cy.contains("Save").click();

    cy.contains("Modify").click();
    cy.contains("Modify").click();
    cy.get('[data-testid="chapter-entry"]').should("have.length", 0);
  });

  it("should be able to add nested chapters", () => {
    cy.visit("localhost:3000/admin/books");
    cy.toggleOffSideBarIfOn();
    cy.contains("Modify").click();
    cy.contains("Modify").click();
    cy.get(".modal-box").should("be.visible");

    cy.contains("Add new chapter").click();
    cy.get("input[placeholder='Chapter ...']").clear().type("Chapter 1");
    cy.contains("Add Chapter").click();

    cy.get('[data-testid="chapter-entry"]')
      .first()
      .within(() => {
        cy.get('[data-testid="chapter-dropdown"]').click();
      });

    cy.contains("Add new chapter").click();
    cy.get("input[placeholder='Chapter ...']").clear().type("Chapter 1.1");
    cy.contains("Add Chapter").click();

    cy.contains("Add new chapter").click();
    cy.get("input[placeholder='Chapter ...']").clear().type("Chapter 1.2");
    cy.contains("Add Chapter").click();

    cy.contains("Add new chapter").click();
    cy.get("input[placeholder='Chapter ...']").clear().type("Chapter 1.3");
    cy.contains("Add Chapter").click();

    cy.contains('[data-testid="chapter-entry"]', "Chapter 1.2").within(() => {
      cy.get('[data-testid="chapter-dropdown"]').click();
    });

    cy.contains("Add new chapter").click();
    cy.get("input[placeholder='Chapter ...']").clear().type("Chapter 1.2.1");
    cy.contains("Add Chapter").click();

    cy.contains("Add new chapter").click();
    cy.get("input[placeholder='Chapter ...']").clear().type("Chapter 1.2.2");
    cy.contains("Add Chapter").click();

    cy.contains("Add new chapter").click();
    cy.get("input[placeholder='Chapter ...']").clear().type("Chapter 1.2.3");
    cy.contains("Add Chapter").click();

    cy.contains("Save").click();

    cy.wait(1000);

    cy.contains("Modify").click();
    cy.contains("Modify").click();
    cy.get('[data-testid="chapter-entry"]').should("have.length", 1);
  });
});

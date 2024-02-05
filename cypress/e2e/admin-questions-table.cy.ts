import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.loadSession("e2e-admin@example.com");
});

describe("Admin Questions Page", () => {
  before(() => {
    cy.clearDB();
    cy.seedAdmin();
    cy.seedQuestions(100);
  });

  it("should render questions table", () => {
    cy.visit("localhost:3000/admin/questions");

    cy.contains(".stat", "Total questions/answers").within(() => {
      cy.contains(".stat-value", "100").should("be.visible");
    });
  });

  it("should be able to edit a question", () => {
    cy.visit("localhost:3000/admin/questions");

    cy.get('[data-testid="question-entry"]')
      .first()
      .within(() => {
        cy.contains("Modify").click();
        cy.contains("Modify").click();
      });
    cy.get(".modal-box").as("modal").should("be.visible");
    cy.get("input[name='name']").clear().type("E2E-Modified");
    cy.get("input[name='description']").clear().type("e2e description");
    cy.get("@modal").within(() => {
      cy.get('[data-testid="chapter-select"]').click();
      cy.get('[data-testid="dropdown-list"]').within(() => {
        cy.get("li").then((options) => {
          const selectedOption = faker.helpers.arrayElement(
            options.get().slice(1)
          );
          cy.wrap(selectedOption.innerText).as("chapterName");
        });
      });
    });
    cy.get("@chapterName").then((chapterName) => {
      cy.get('[data-testid="dropdown-list"]')
        .contains(chapterName as unknown as string)
        .click();
    });
    cy.contains("Save").click();
    cy.get("@chapterName").then((chapter) => {
      cy.contains("[data-testid='question-entry']", "E2E-Modified").within(
        () => {
          cy.contains(chapter as unknown as string).should("be.visible");
        }
      );
    });
  });

  it("should be able to delete a question", () => {
    cy.visit("localhost:3000/admin/questions");
    cy.get('[data-testid="question-entry"]')
      .first()
      .within(() => {
        cy.contains("Remove").click();
      });
    cy.contains(".stat", "Total questions/answers").within(() => {
      cy.contains(".stat-value", "99").should("be.visible");
    });
  });
});

describe("Admin Questions Form", () => {
  before(() => {
    cy.clearDB();
    cy.seedAdmin();
    cy.seedBooks(1);
  });

  it("should be able to create a question", () => {
    cy.visit("localhost:3000/admin/questions");

    cy.wait(1000);
    cy.contains("Add Question", { matchCase: false }).click();
    cy.contains("Add Question", { matchCase: false }).click();
    cy.get(".modal-box").as("modal").should("be.visible");

    cy.get("input[name='name']").clear().type("Question 1");
    cy.get("input[name='description']").clear().type("description");
    cy.get("@modal").within(() => {
      cy.get('[data-testid="book-select"]').click();
      cy.get('[data-testid="dropdown-option"]').last().click();
      cy.get('[data-testid="chapter-select"]').click();
      cy.get('[data-testid="dropdown-option"]').last().click();
    });

    cy.contains("Save").click();

    cy.contains("[data-testid='question-entry']", "Question 1").should(
      "be.visible"
    );
  });
});

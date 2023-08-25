import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.loadAdminSession();
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
      cy.get(".stat-value").contains("100");
    });

    for (let i = 0; i < 10; i++) {
      cy.get(`[data-title="${i + 1}"]`).click();
      cy.get('[data-testid="question-entry"]').should("have.length", 10);
    }
  });

  it("should be able to edit a question", () => {
    cy.visit("localhost:3000/admin/questions");
    cy.get('[data-testid="question-entry"]')
      .first()
      .within(() => {
        cy.contains("Modify").click();
        cy.contains("Modify").click();
      });
    cy.get(".modal-box").should("be.visible");
    cy.get("input[name='name']").clear().type("E2E-Modified");
    cy.get("input[name='description']").clear().type("e2e description");
    cy.get("select[name='chapterId']").within(() => {
      cy.get("option").then((options) => {
        const selectedOptions = faker.helpers.arrayElement(options.get());
        cy.wrap(selectedOptions.innerText).as("chapter");
      });
    });
    cy.get("@chapter").then((chapter) => {
      cy.get("select[name='chapterId']").select(chapter as unknown as string);
    });
    cy.contains("Save").click();
    cy.get("@chapter").then((chapter) => {
      cy.contains("[data-testid='question-entry']", "E2E-Modified").within(
        () => {
          cy.contains(chapter as unknown as string);
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
      cy.get(".stat-value").contains("99");
    });

    cy.get('[data-title="10"]').click();
    cy.get('[data-testid="question-entry"]').should("have.length", 9);
  });
});

describe("Admin Questions Form", () => {
  before(() => {
    cy.clearDB();
    cy.seedAdmin();
    cy.seedBooks(1);
  });

  it.only("should be able to create a question", () => {
    cy.visit("localhost:3000/admin/questions");

    cy.wait(1000);
    cy.contains("Add Question", { matchCase: false }).click();
    cy.contains("Add Question", { matchCase: false }).click();
    cy.get(".modal-box").should("be.visible");

    cy.get("input[name='name']").clear().type("Question 1");
    cy.get("input[name='description']").clear().type("description");
    cy.contains("Save").click();

    cy.contains("[data-testid='question-entry']", "Question 1");
  });
});

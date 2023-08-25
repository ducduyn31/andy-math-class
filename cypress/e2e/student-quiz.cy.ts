beforeEach(() => {
  cy.loadSession("e2e-user-1@example.com");
});

describe("Student activated", () => {
  before(() => {
    cy.clearDB();
    cy.seedUsers(1);
    cy.seedQuestions(10);
    cy.assignBooksToStudents();
  });

  it("should not allow going to admin page", () => {
    cy.visit("localhost:3000/admin");
    cy.url().should("not.include", "admin");
  });

  it("should disable quiz when there is no question selected", () => {
    cy.visit("localhost:3000");

    cy.contains("button", "Start Quiz", { matchCase: false }).should(
      "be.disabled"
    );

    cy.get(".menu").within(() => {
      cy.get("li").click();
    });

    cy.contains("button", "Start Quiz", { matchCase: false }).should(
      "not.be.disabled"
    );
  });

  it("should be able to start quiz", () => {
    cy.visit("localhost:3000");
    cy.get(".menu").within(() => {
      cy.get("li").click();
    });
    cy.contains("button", "Start Quiz", { matchCase: false }).click();
    cy.contains("Question 1 / 10").should("be.visible");
    cy.contains("Previous").should("be.disabled");

    for (let i = 0; i < 9; i++) {
      cy.contains("Next").click();
      cy.contains("Previous").should("not.be.disabled");
    }
    cy.contains("Question 10 / 10").should("be.visible");
    cy.contains("Finish").click();
    cy.contains("Start Over", { matchCase: false }).click();
    cy.contains("Question 1 / 10").should("be.visible");
  });

  it("should stop the quiz when chapters selection changed", async () => {
    cy.visit("localhost:3000");

    cy.contains("button", "Start Quiz", { matchCase: false }).click();
    cy.contains("Question 1 / 10").should("be.visible");
    cy.contains("Previous").should("be.disabled");

    cy.get(".menu").within(() => {
      cy.get("li").click();
    });

    cy.contains("button", "Start Quiz", { matchCase: false }).should(
      "be.disabled"
    );
  });
});

describe("Student not activated", () => {
  before(() => {
    cy.clearDB();
    cy.seedUsers(1, false);
    cy.wait(1000);
  });

  it("should show contact message", async () => {
    cy.visit("localhost:3000");
    cy.contains("You aren't activated. Please contact Andy to proceed!").should(
      "be.visible"
    );
  });
});

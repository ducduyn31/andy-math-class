describe("Seed Users", () => {
  it("should clear db", () => {
    cy.clearDB();
  });

  it("should seed users", () => {
    cy.seedUsers(1000);
  });

  it("should seed admin", () => {
    cy.seedAdmin();
  });

  it("should seed books", () => {
    cy.seedBooks(50);
  });

  it("should seed questions", () => {
    cy.seedQuestions(1000);
  });
});

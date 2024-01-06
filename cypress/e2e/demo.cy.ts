describe("Seed Users", () => {
  it.skip("should seed users", () => {
    cy.seedUsers(1000);
  });

  it.skip("should seed admin", () => {
    cy.seedAdmin();
  });

  it.skip("should seed books", () => {
    cy.seedBooks(10);
  });

  it("should seed questions", () => {
    cy.seedQuestions(1000);
  });

  it.skip("should clear db", () => {
    cy.clearDB();
  });
});

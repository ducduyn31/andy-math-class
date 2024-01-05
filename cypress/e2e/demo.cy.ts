describe("Seed Users", () => {
  it("should seed users", () => {
    cy.seedUsers(1000);
  });
});

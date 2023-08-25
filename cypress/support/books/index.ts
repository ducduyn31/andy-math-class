import {
  generateRandomBooksAndChapters,
  randomlyDistributionBooksToStudents,
} from "./db";

const supabaseDomain = Cypress.env("SUPABASE_URL");
const supabaseSvcRoleKey = Cypress.env("SUPABASE_KEY");

Cypress.Commands.add("seedBooks", (count, chaptersCount = 20) => {
  const bookInsert = new Cypress.Promise((resolve) => {
    generateRandomBooksAndChapters({
      domain: supabaseDomain,
      key: supabaseSvcRoleKey,
      bookCount: count,
      chapterCount: chaptersCount,
    }).then(() => {
      resolve();
    });
  });

  return cy.wrap(bookInsert).then(() => {
    cy.log("Books seeded");
  });
});

Cypress.Commands.add("assignBooksToStudents", () => {
  const assignBooks = new Cypress.Promise(async (resolve) => {
    await randomlyDistributionBooksToStudents({
      domain: supabaseDomain,
      key: supabaseSvcRoleKey,
    });
    resolve();
  });

  return cy.wrap(assignBooks).then(() => {
    cy.log("Books assigned to students");
  });
});

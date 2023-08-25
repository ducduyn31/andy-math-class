import { generateRandomBooksAndChapters } from "./db";

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

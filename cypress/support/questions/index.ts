import { generateRandomQuestionsAndAnswers } from "./db";

const supabaseDomain = Cypress.env("SUPABASE_URL");
const supabaseSvcRoleKey = Cypress.env("SUPABASE_KEY");

Cypress.Commands.add(
  "seedQuestions",
  (count, questionsCount, answersCount = 5) => {
    const questionsInsert = new Cypress.Promise((resolve) => {
      generateRandomQuestionsAndAnswers({
        domain: supabaseDomain,
        key: supabaseSvcRoleKey,
        questionCount: count,
      }).then(() => {
        resolve();
      });
    });

    return cy.wrap(questionsInsert).then(() => {
      cy.log("Questions seeded");
    });
  }
);

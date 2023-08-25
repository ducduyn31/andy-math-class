import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";
import { generateRandomBooksAndChapters } from "../books/db";

export const clearQuestionsTable = async (domain: string, key: string) => {
  const supabase = createClient(domain, key, {
    db: {
      schema: "public",
    },
  });

  const deleteQuestions = supabase.from("questions").delete().neq("name", "");

  return Promise.all([deleteQuestions]);
};

interface GenerateRandomQuestionsAndAnswersArgs {
  domain: string;
  key: string;
  bookId?: string;
  chapterId?: string;
  questionCount?: number;
}

export const generateRandomQuestionsAndAnswers = async ({
  domain,
  key,
  bookId,
  chapterId,
  questionCount = 10,
}: GenerateRandomQuestionsAndAnswersArgs) => {
  const supabase = createClient(domain, key, {
    db: {
      schema: "public",
    },
  });

  let bookIds: string[];
  let chapterIds: string[];

  if (!bookId || !chapterId) {
    const { books, chapters } = await generateRandomBooksAndChapters({
      domain,
      key,
      bookCount: 1,
      chapterCount: 10,
    });
    bookIds = books?.data?.map(({ id }) => id) ?? [];
    chapterIds = chapters?.data?.map(({ id }) => id) ?? [];
  } else {
    bookIds = [bookId];
    chapterIds = [chapterId];
  }

  const questions = await supabase
    .from("questions")
    .insert(
      Array.from({ length: questionCount }, (_, index) => ({
        name: `Question ${index + 1}`,
        description: faker.lorem.words({ min: 5, max: 10 }),
        book: faker.helpers.arrayElement(bookIds),
        chapter: faker.helpers.arrayElement(chapterIds),
      }))
    )
    .select("id");

  return {
    questions,
  };
};

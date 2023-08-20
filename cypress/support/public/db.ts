import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";

export const clearPublicDB = async (domain: string, key: string) => {
  const supabase = createClient(domain, key, {
    db: {
      schema: "public",
    },
  });

  const deleteBooks = supabase.from("books").delete().neq("name", "");

  return Promise.all([deleteBooks]);
};

export const generateRandomBooksAndChapters = async (
  domain: string,
  key: string,
  bookCount = 10,
  chapterCount = 20
) => {
  const supabase = createClient(domain, key, {
    db: {
      schema: "public",
    },
  });

  const books = await supabase
    .from("books")
    .insert(
      Array.from({ length: bookCount }, () => ({
        name: faker.lorem.words(3),
        color: faker.color.rgb(),
      }))
    )
    .select("id");

  const prepareChapters = books?.data
    ?.map(({ id }) =>
      Array.from(
        { length: faker.number.int({ min: 0, max: chapterCount }) },
        (_, ind) => ({
          name: `${ind}. ${faker.lorem.words(3)}`,
          book: id,
          order: ind + 1,
        })
      )
    )
    .flatMap((chapters) => chapters);

  const chapters = await supabase.from("chapters").insert(prepareChapters);

  return {
    books,
    chapters,
  };
};

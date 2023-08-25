import { Book, convertBook } from "@/models";
import { faker } from "@faker-js/faker";

interface MockBookArgs {
  chaptersCount?: number;
  chaptersNames?: string[];
  bookTitle?: string;
  color?: string;
}

const defaultMockBookArgs: MockBookArgs = {
  chaptersCount: 10,
};

export const mockBook = (args?: MockBookArgs): Book => {
  const parsedArgs = { ...defaultMockBookArgs, ...args };

  const chapters =
    parsedArgs.chaptersNames?.map((name, index) => ({
      id: faker.string.uuid(),
      name: name,
      order: index + 1,
      parent: null,
      book: null,
    })) ??
    Array.from({
      length: parsedArgs.chaptersCount ?? 10,
    }).map((_, index) => ({
      id: faker.string.uuid(),
      name: faker.lorem.words(3),
      order: index + 1,
      parent: null,
      book: null,
    }));

  return convertBook({
    id: faker.string.uuid(),
    name: parsedArgs.bookTitle || faker.lorem.words(3),
    color: parsedArgs.color || faker.internet.color(),
    chapters: chapters || [],
  });
};

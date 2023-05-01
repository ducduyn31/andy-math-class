import { Book, Chapter } from "@/models";
import { Maybe } from "@/models/types";
import { questionDatabase } from "@/components/admin/Table/AdminQuestionTable";
import { faker } from "@faker-js/faker";

export interface Question {
  id: Maybe<string>;
  name: string;
  book: Book;
  chapter: Maybe<Chapter>;
}

export interface Answer {
  id: Maybe<string>;
  name: string;
  question: Question;
}

export const answersDatabase: Answer[] = questionDatabase
  .map((question) => {
    const answersNumber = faker.datatype.number({ min: 1, max: 5 });
    return Array.from({ length: answersNumber }).map((_, index) => ({
      id: `${question.id}-${index}`,
      name: faker.lorem.sentence(),
      question,
    }));
  })
  .flatMap((answers) => answers);

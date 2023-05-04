import { Book, Chapter, mapBook } from "@/models";
import { Maybe } from "@/models/types";
import { questionDatabase } from "@/components/admin/table/questions-table";
import { faker } from "@faker-js/faker";
import { Questions as _Question } from "@/gql/types";

export interface Question {
  id: Maybe<string>;
  name: string;
  book: Maybe<Book>;
  chapter: Maybe<Chapter>;
  description: Maybe<string>;
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

type PartialQuestion = Pick<
  _Question,
  "id" | "name" | "books" | "chapter" | "description"
>;
type PartialQuestionEdge = { node: PartialQuestion };
export const mapQuestion = (question: PartialQuestionEdge): Question => {
  return {
    id: question?.node?.id,
    name: question?.node?.name || "",
    book: question?.node?.books ? mapBook(question.node.books) : null,
    chapter: null,
    description: question?.node?.description,
  };
};

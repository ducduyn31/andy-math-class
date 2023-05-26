import { Book, Question, User } from "@/models";
import { assureNonNull } from "@/helpers/array";

export enum Mappers {
  MAP_BOOK_NAME = "mapBookName",
  MAP_USER_EMAIL = "mapUserEmail",
  MAP_QUESTION_BOOK_ID = "mapQuestionBookId",
  MAP_QUESTION_CHAPTER_ID = "mapQuestionChapterId",
  MAP_USER_ASSIGNED_BOOKS = "mapUserAssignedBooks",
  MAP_USER_IS_ENABLED = "mapUserIsEnabled",
}

type MapToString<T> = (input: T) => string;
type MapToStringArray<T> = (input: T) => string[];
type MapToAny = (input: any) => any;

interface MapperReturn {
  [Mappers.MAP_BOOK_NAME]: MapToString<Book>;
  [Mappers.MAP_USER_EMAIL]: MapToString<User>;
  [Mappers.MAP_QUESTION_BOOK_ID]: MapToString<Question>;
  [Mappers.MAP_QUESTION_CHAPTER_ID]: MapToString<Question>;
  [Mappers.MAP_USER_ASSIGNED_BOOKS]: MapToStringArray<User>;
  [Mappers.MAP_USER_IS_ENABLED]: MapToString<User>;
}

export const createMapper = <T extends Mappers>(
  mapperType: T
): MapperReturn[T] | MapToAny => {
  switch (mapperType) {
    case Mappers.MAP_BOOK_NAME:
      return (input: Book) => input.name;
    case Mappers.MAP_USER_EMAIL:
      return (input: User) => input.email;
    case Mappers.MAP_QUESTION_BOOK_ID:
      return (input: Question) => input.book?.id || "";
    case Mappers.MAP_QUESTION_CHAPTER_ID:
      return (input: Question) => input.chapter?.id || "";
    case Mappers.MAP_USER_ASSIGNED_BOOKS:
      return (input: User) =>
        assureNonNull(input.assignedBooks?.map((book) => book.id));
    case Mappers.MAP_USER_IS_ENABLED:
      return (input: User) => `${input.isEnabled}`;
    default:
      return (input: any) => input;
  }
};

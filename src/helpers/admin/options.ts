import { Book, Chapter } from "@/models";
import { SelectOption, SelectOptions } from "@/helpers/form";
import { Maybe } from "@/gql/types";

export const mapBooksToOptions = (
  books: Book[],
  ignoreAnyOption: boolean = false
): SelectOption[] => {
  const bookOptions = books.map(mapBookToOption);
  if (ignoreAnyOption) {
    return bookOptions;
  }
  return [SelectOptions.ANY_DEFAULT, ...bookOptions];
};

export const mapBookToOption = (book?: Maybe<Book>): SelectOption => {
  if (!book) {
    return SelectOptions.NONE;
  }
  return {
    uniqueKey: book.id,
    value: book.id,
    label: book.name,
  };
};

export const getUserStatusOptions = (): SelectOption[] => [
  SelectOptions.ANY_DEFAULT,
  { uniqueKey: "status_enabled", value: "true", label: "Enabled" },
  { uniqueKey: "status_disabled", value: "false", label: "Disabled" },
];

export const mapChaptersToOptions = (chapters: Chapter[]): SelectOption[] => {
  const chapterOptions = chapters.map(mapChapterToOption);
  return [SelectOptions.ANY_DEFAULT, ...chapterOptions];
};

export const mapChapterToOption = (chapter?: Maybe<Chapter>): SelectOption => {
  if (!chapter) {
    return SelectOptions.NONE;
  }
  return {
    uniqueKey: chapter.id,
    value: chapter.id,
    label: chapter.name,
  };
};

export const mapAssignedBooksToOptions = (books?: Book[]): SelectOption[] => {
  return (
    books?.map((book) => ({
      uniqueKey: book.id,
      value: book.id,
      label: book.name,
    })) || []
  );
};

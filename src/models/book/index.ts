import { Maybe } from "@/models/types";
import { Books as _Book } from "@/gql/types";

export interface Book {
  id: string;
  name: string;
  color: Maybe<string>;
  chapters: Chapter[];

  get rootChapters(): Chapter[];
}

export interface Chapter {
  id: string;
  name: string;
  parent: Maybe<Chapter>;
  book: Maybe<Book>;
  children?: Maybe<Chapter[]>;
}

const constructChapterTrees = (chapters: Chapter[]): Chapter[] => {
  const chapterMap = chapters.reduce((map, chapter) => {
    map[chapter.id] = chapter;
    return map;
  }, {} as Record<string, Chapter>);

  return chapters.map((chapter) => {
    if (chapter.parent) {
      chapter.parent = chapterMap[chapter.parent.id];
      chapter.parent.children = [...(chapter.parent.children || []), chapter];
    }
    return chapter;
  });
};

const assignBookToChapter = (book: Book, chapters: Chapter[]): Chapter[] => {
  return chapters.map((chapter) => {
    chapter.book = book;
    return chapter;
  });
};

export const convertBook = (partialBook: Partial<Book>): Book => {
  const book = {
    id: partialBook.id || "",
    name: partialBook.name || "",
    color: partialBook.color || null,
    get rootChapters() {
      return this.chapters.filter((chapter) => !chapter.parent);
    },
  } as Book;

  book.chapters = assignBookToChapter(
    book,
    constructChapterTrees(partialBook.chapters || [])
  );
  return book;
};

export const createFullChapter = (
  partialChapter: Partial<Chapter>
): Chapter => {
  return {
    id: partialChapter.id || "",
    name: partialChapter.name || "",
    parent: partialChapter.parent || null,
    book: partialChapter.book || null,
    children: partialChapter.children || [],
  };
};

type PartialBook = Pick<_Book, "id" | "name" | "color">;
type PartialBookEdge = { node: PartialBook };
export const mapBook = (book: PartialBookEdge | PartialBook): Book => {
  if (!("node" in book)) {
    return convertBook({
      id: book?.id || "",
      name: book.name || "",
      color: book.color,
      chapters: [],
    });
  }
  return convertBook({
    id: book?.node?.id,
    name: book?.node?.name || "",
    color: book?.node?.color,
    chapters: [],
  });
};

type PartialBookAssignation = { books?: Maybe<PartialBook> };
type PartialBookAssignationEdge = { node: PartialBookAssignation };

export const mapAssignedBook = (
  assignation: PartialBookAssignationEdge | PartialBookAssignation
): Book | null => {
  if (!("node" in assignation)) {
    return assignation?.books ? mapBook(assignation?.books) : null;
  }
  return assignation?.node?.books ? mapBook(assignation?.node?.books) : null;
};

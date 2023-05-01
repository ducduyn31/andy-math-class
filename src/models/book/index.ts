import { Maybe } from "@/models/types";

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

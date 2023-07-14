import { Maybe } from "@/models/types";
import {
  Books as _Book,
  ChaptersInBookFragment,
  GetAllForAdminQuery,
  GetAssignedBooksQuery,
} from "@/gql/types";
import { Optionable } from "@/components/form-select-field";

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
  order?: number;
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

export const assignBookToChapter = (
  book: Maybe<Book>,
  chapter: Chapter
): Chapter => {
  chapter.book = book;
  return chapter;
};

const assignBookToChapters = (book: Book, chapters: Chapter[]): Chapter[] => {
  return chapters.map((chapter) => assignBookToChapter(book, chapter));
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

  book.chapters = assignBookToChapters(
    book,
    constructChapterTrees(partialBook.chapters || [])
  );
  return book;
};

export const createFullChapter = (partialChapter: PartialChapter): Chapter => {
  return {
    id: partialChapter.id || "",
    name: partialChapter.name || "",
    parent: partialChapter.parent || null,
    book: partialChapter.book || null,
    order: partialChapter.order || 0,
    children: partialChapter.children || [],
  };
};

interface PartialChapter extends Omit<Partial<Chapter>, "name"> {
  name?: Maybe<string>;
}

type PartialChaptersEdge = { node?: Maybe<PartialChapter> };
type PartialChaptersConnection = { edges?: Maybe<PartialChaptersEdge[]> };
type PartialBook = Pick<_Book, "id" | "name" | "color"> & {
  chaptersCollection?: Maybe<PartialChaptersConnection>;
};
export const mapBook = (book: PartialBook): Book => {
  return convertBook({
    id: book?.id || "",
    name: book.name || "",
    color: book.color,
    chapters:
      book?.chaptersCollection?.edges?.map((chapterEdge) =>
        createFullChapter({
          ...chapterEdge.node,
          name: chapterEdge.node?.name || "",
        })
      ) || [],
  });
};

export const mapToOption = (bookOrChapter: Book | Chapter): Optionable => ({
  id: bookOrChapter.id,
  value: bookOrChapter.id,
  label: bookOrChapter.name,
});

export const mapChaptersFromChaptersInBookFragment = (
  book: Book,
  chaptersConnection?: Maybe<ChaptersInBookFragment>
): Chapter[] => {
  const chapterNodes =
    chaptersConnection?.edges?.map((edge) => edge?.node) || [];

  const chapters: Chapter[] = chapterNodes.map((chapter) => ({
    id: chapter?.id || "",
    name: chapter?.name || "",
    book: book,
    parent: chapter?.parent ? createFullChapter({ id: chapter.parent }) : null,
    order: chapter?.order || 0,
    children: [],
  }));

  return constructChapterTrees(chapters);
};

export const mapBooksFromGetAdminStat = (
  response: GetAllForAdminQuery
): Book[] => {
  const bookNodes =
    response?.booksCollection?.edges?.map((edge) => edge?.node) || [];

  return bookNodes.map((bookNode) => {
    const book: Book = {
      id: bookNode?.id || "",
      name: bookNode?.name || "",
      color: bookNode?.color || null,
      chapters: [],
      get rootChapters() {
        return this.chapters.filter((chapter) => !chapter.parent);
      },
    };

    book.chapters = mapChaptersFromChaptersInBookFragment(
      book,
      bookNode?.chaptersCollection
    );

    return book;
  });
};

export const mapBooksFromGetAssignedBooks = (
  response: GetAssignedBooksQuery
): Book[] => {
  const bookNodes =
    response?.booksCollection?.edges?.map((edge) => edge?.node) || [];

  return bookNodes.map((bookNode) => {
    const book: Book = {
      id: bookNode?.id || "",
      name: bookNode?.name || "",
      color: null,
      chapters: [],
      get rootChapters() {
        return this.chapters.filter((chapter) => !chapter.parent);
      },
    };

    book.chapters = mapChaptersFromChaptersInBookFragment(
      book,
      bookNode?.chaptersCollection
    );

    return book;
  });
};

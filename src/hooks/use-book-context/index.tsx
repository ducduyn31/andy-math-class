import React, { createContext, useCallback, useContext, useMemo } from "react";

import { Book, Chapter } from "@/models";
import { useMap } from "react-use";
import { assureNonNull } from "@/helpers/array";

export type BookContextType = {
  selectedBooks: Book[];
  selectedChapters: Chapter[];
  addBook: (book: Book) => void;
  removeBook: (book: Book) => void;
  hasBook: (book: Book) => boolean;
  toggleBook: (book: Book) => void;
  addChapter: (chapter: Chapter) => void;
  addAllChapters: (chapters: Chapter[]) => void;
  removeChapter: (chapter: Chapter) => void;
  hasChapter: (chapter: Chapter) => boolean;
  toggleChapter: (chapter: Chapter) => void;
};

const BookContext = createContext<BookContextType>({
  selectedBooks: [],
  selectedChapters: [],
  addBook: () => {},
  removeBook: () => {},
  hasBook: () => false,
  toggleBook: () => {},
  addChapter: () => {},
  addAllChapters: () => {},
  removeChapter: () => {},
  hasChapter: () => false,
  toggleChapter: () => {},
});

export const BookProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedBooks, { set: setBook, remove: unsetBook }] =
    useMap<Record<string, Book>>();
  const [selectedChapters, { set: setChapter, remove: unsetChapter }] =
    useMap<Record<string, Chapter>>();
  const [
    selectedChaptersByBook,
    { set: setChaptersByBook, remove: unsetChaptersByBook },
  ] = useMap<Record<string, Set<string>>>();

  const hasChapter = useCallback(
    (chapter: Chapter) => {
      return !!selectedChapters[chapter.id];
    },
    [selectedChapters]
  );

  const hasBook = useCallback(
    (book: Book) => {
      return !!selectedBooks[book.id];
    },
    [selectedBooks]
  );

  const addAllChapters = useCallback(
    (chapters: Chapter[]) => {
      const allChapters = bfsChapterTraversal(chapters);
      const toAdd = allChapters.filter((chapter) => !hasChapter(chapter));
      const books = new Set(
        assureNonNull(toAdd.map((chapter) => chapter.book))
      );
      if (!toAdd.length) return;
      toAdd.forEach((chapter) => setChapter(chapter.id, chapter));
      const bookId = toAdd[0].book?.id;
      if (!bookId) return;
      const chaptersByBook =
        selectedChaptersByBook[bookId] ?? new Set<string>();
      toAdd.forEach((chapter) => chaptersByBook.add(chapter.id));
      setChaptersByBook(bookId, chaptersByBook);
      books.forEach((book) => {
        if (!hasBook(book)) {
          setBook(book.id, book);
        }
      });
    },
    [
      hasBook,
      hasChapter,
      selectedChaptersByBook,
      setBook,
      setChapter,
      setChaptersByBook,
    ]
  );

  const addBook = useCallback(
    (book: Book) => {
      if (!hasBook(book)) {
        setBook(book.id, book);
        // Add all chapters from the book
        addAllChapters(book.chapters);
      }
    },
    [addAllChapters, hasBook, setBook]
  );

  const removeBook = (book: Book) => {
    unsetBook(book.id);
    // Remove all chapters from the book
    book.chapters.forEach(removeChapter);
  };

  const toggleBook = (book: Book) => {
    if (hasBook(book)) {
      removeBook(book);
    } else {
      addBook(book);
    }
  };

  const bfsChapterTraversal = (chapters: Chapter[]): Chapter[] => {
    const traversed = new Set<string>();
    const queue = [...chapters];
    const result: Chapter[] = [];

    while (queue.length) {
      const current = queue.shift();
      if (!current) continue;
      if (traversed.has(current.id)) continue;
      traversed.add(current.id);
      result.push(current);
      if (current.children) queue.push(...current.children);
    }

    return result;
  };

  const addChapter = useCallback(
    (chapter: Chapter) => {
      addAllChapters([chapter]);
    },
    [addAllChapters]
  );

  const removeChapters = useCallback(
    (chapters: Chapter[]) => {
      const allChapters = bfsChapterTraversal(chapters);
      const toRemove = allChapters.filter((chapter) => hasChapter(chapter));
      if (!toRemove.length) return;
      toRemove.forEach((chapter) => unsetChapter(chapter.id));
      const bookId = toRemove[0].book?.id;
      if (!bookId) return;
      const chaptersByBook = selectedChaptersByBook[bookId];
      if (!chaptersByBook) return;
      toRemove.forEach((chapter) => chaptersByBook.delete(chapter.id));
      if (!chaptersByBook.size) {
        unsetBook(bookId);
        unsetChaptersByBook(bookId);
      } else {
        setChaptersByBook(bookId, chaptersByBook);
      }
    },
    [
      hasChapter,
      selectedChaptersByBook,
      setChaptersByBook,
      unsetBook,
      unsetChapter,
      unsetChaptersByBook,
    ]
  );

  const removeChapter = useCallback(
    (chapter: Chapter) => {
      removeChapters([chapter]);
    },
    [removeChapters]
  );

  const toggleChapter = (chapter: Chapter) => {
    if (hasChapter(chapter)) {
      removeChapter(chapter);
    } else {
      addChapter(chapter);
    }
  };

  return (
    <BookContext.Provider
      value={{
        selectedBooks: useMemo(
          () => Object.values(selectedBooks),
          [selectedBooks]
        ),
        selectedChapters: useMemo(
          () => Object.values(selectedChapters),
          [selectedChapters]
        ),
        addBook,
        removeBook,
        hasBook,
        toggleBook,
        addChapter,
        addAllChapters,
        removeChapter,
        hasChapter,
        toggleChapter,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  return useContext(BookContext);
};

export default BookContext;

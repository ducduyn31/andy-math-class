// Implement the BookContext here
// 1. Create a context with the type of BookContextType
// 2. Create a provider for the context
// 3. Create a custom hook to consume the context
// 4. Export the context and the custom hook

import React, { createContext, useContext, useMemo } from "react";

import { Book, Chapter } from "@/models";
import { useMap } from "react-use";

export type BookContextType = {
  selectedBooks: Book[];
  selectedChapters: Chapter[];
  addBook: (book: Book) => void;
  removeBook: (book: Book) => void;
  hasBook: (book: Book) => boolean;
  toggleBook: (book: Book) => void;
  addChapter: (chapter: Chapter) => void;
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

  const addBook = (book: Book) => {
    if (!hasBook(book)) {
      setBook(book.id, book);
      // Add all chapters from the book
      book.chapters.forEach(addChapter);
    }
  };

  const removeBook = (book: Book) => {
    unsetBook(book.id);
    // Remove all chapters from the book
    book.chapters.forEach(removeChapter);
  };

  const hasBook = (book: Book) => {
    return !!selectedBooks[book.id];
  };

  const toggleBook = (book: Book) => {
    if (hasBook(book)) {
      removeBook(book);
    } else {
      addBook(book);
    }
  };

  const addChapter = (chapter: Chapter) => {
    if (hasChapter(chapter)) return;

    setChapter(chapter.id, chapter);

    if (!chapter.book) return;

    if (!hasBook(chapter.book)) {
      setBook(chapter.book.id, chapter.book);
    }

    const chaptersByBook =
      selectedChaptersByBook[chapter.book.id] ?? new Set<string>();
    chaptersByBook.add(chapter.id);
    setChaptersByBook(chapter.book.id, chaptersByBook);

    chapter.children?.forEach(addChapter);
  };

  const removeChapter = (chapter: Chapter) => {
    if (!hasChapter(chapter)) return;
    unsetChapter(chapter.id);
    if (!chapter.book) return;
    const chaptersByBook = selectedChaptersByBook[chapter.book.id];
    chaptersByBook.delete(chapter.id);
    if (!chaptersByBook?.size) {
      unsetBook(chapter.book.id);
      unsetChaptersByBook(chapter.book.id);
    } else {
      setChaptersByBook(chapter.book.id, chaptersByBook);
    }
    chapter.children?.forEach(removeChapter);
  };

  const hasChapter = (chapter: Chapter) => {
    return !!selectedChapters[chapter.id];
  };

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

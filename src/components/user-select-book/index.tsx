import React from "react";
import { BookSelectLabel } from "@/components/user-select-book/components/book-select-label";
import { useBookContext } from "@/hooks/use-book-context";
import { UserSelectChapterItem } from "@/components/user-select-chapter";
import { Book } from "@/models";

interface Props {
  book: Book;
}

export const UserSelectBookItem: React.FC<Props> = ({ book }) => {
  const { hasBook } = useBookContext();

  return (
    <>
      <BookSelectLabel book={book} />
      {hasBook(book) &&
        book.rootChapters.map((chapter) => (
          <li key={`${chapter.id}`} className="pr-0 py-0 bg-base-300 gap-y-0">
            <UserSelectChapterItem chapter={chapter} />
          </li>
        ))}
    </>
  );
};

import React from "react";
import { Book } from "@/models";
import { useBookContext } from "@/hooks/use-book-context";

export const BookSelectLabel = (props: { book: Book }) => {
  const { hasBook, toggleBook } = useBookContext();
  return (
    <a
      className="flex justify-between hover:bg-base-300"
      onClick={() => toggleBook(props.book)}
    >
      <p className="">{props.book.name}</p>
      <input
        type="checkbox"
        className="checkbox"
        checked={hasBook(props.book)}
      />
    </a>
  );
};

import React from "react";
import { useGetAssignedBooks } from "@/hooks/use-get-assigned-books";
import { UserSelectBookItem } from "@/components/user-select-book";

export const SidedQuestionFilter: React.FC = () => {
  const assignedBooks = useGetAssignedBooks();

  return (
    <aside className="bg-base-300">
      <ul className="menu">
        {assignedBooks.map((book) => (
          <li key={book.name}>
            <UserSelectBookItem book={book} />
          </li>
        ))}
      </ul>
    </aside>
  );
};

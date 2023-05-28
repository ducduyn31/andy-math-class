import React, { useEffect, useRef } from "react";
import { useGetAssignedBooks } from "@/hooks/use-get-assigned-books";
import { UserSelectBookItem } from "@/components/user-select-book";
import { useBookContext } from "@/hooks/use-book-context";
import { usePersistSelectedChapters } from "@/hooks/use-persist-selected-chapters";

export const SidedQuestionFilter: React.FC = () => {
  const hasLoaded = useRef(false);
  const { books: assignedBooks } = useGetAssignedBooks();
  const { addAllChapters } = useBookContext();
  const { lastSelectedChapters } = usePersistSelectedChapters();

  useEffect(() => {
    if (lastSelectedChapters && assignedBooks.length && !hasLoaded.current) {
      const assignedChapters = assignedBooks
        .flatMap((book) => book.chapters)
        .filter((chapter) => lastSelectedChapters.has(chapter.id));
      addAllChapters(assignedChapters);
      hasLoaded.current = true;
    }
  }, [addAllChapters, assignedBooks, lastSelectedChapters]);

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

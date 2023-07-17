import React, { useEffect, useRef } from "react";
import { useGetAssignedBooks } from "@/hooks/use-get-assigned-books";
import { UserSelectBookItem } from "@/components/user-select-book";
import { useBookContext } from "@/hooks/use-book-context";
import { usePersistSelectedChapters } from "@/hooks/use-persist-selected-chapters";

export const SidedQuestionFilter: React.FC = () => {
  const hasLoaded = useRef(false);
  const { books: assignedBooks } = useGetAssignedBooks();
  const { addChaptersIgnoreChildren } = useBookContext();
  const { lastSelectedChapters } = usePersistSelectedChapters();

  useEffect(() => {
    if (lastSelectedChapters && assignedBooks.length && !hasLoaded.current) {
      const assignedChapters = assignedBooks
        .flatMap((book) => book.chapters)
        .filter((chapter) => lastSelectedChapters.has(chapter.id));
      addChaptersIgnoreChildren(assignedChapters);
      hasLoaded.current = true;
    }
  }, [addChaptersIgnoreChildren, assignedBooks, lastSelectedChapters]);

  return (
    <aside className="bg-base-300 max-h-[90vh] overflow-y-scroll">
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

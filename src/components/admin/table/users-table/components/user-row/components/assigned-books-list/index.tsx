import React, { useEffect, useMemo, useState } from "react";
import { Book } from "@/models";
import { Each } from "@/components/each";
import { useElementSize } from "usehooks-ts";
import { assureNumber } from "@/helpers/number";

interface Props {
  books: Book[] | undefined;
  heightLimit?: number;
}

export const AssignedBooksList: React.FC<Props> = ({ books, heightLimit }) => {
  const parentPadding = 12;
  const elementHeight = 24;
  const elementGap = 4;
  const elementPadding = 12;
  const characterWidth = 8;
  const moreButtonWidth = 61;

  const [tdRef, { width: widthLimit }] = useElementSize();
  const [limitShowingAssignedBooks, setLimitShowingAssignedBooks] = useState(1);

  const initialLimitOnRender = useMemo(() => {
    if (!heightLimit) return assureNumber(books?.length);
    let maxVisibleBooks = 0;
    let lastRowWidth = 0;
    let currentRowWidth = 0;
    let totalLines = 1;

    for (let i = 0; i < assureNumber(books?.length); i++) {
      if (!books?.[i]) continue;
      const elementWidth =
        books[i].name.length * characterWidth + elementPadding * 2;
      currentRowWidth += elementWidth + elementGap;

      if (currentRowWidth >= widthLimit) {
        lastRowWidth = currentRowWidth;
        currentRowWidth = elementWidth + elementGap;
        totalLines++;
      }
      if (totalLines * elementHeight > heightLimit - 2 * parentPadding) break;
      maxVisibleBooks++;
    }
    if (lastRowWidth + moreButtonWidth >= widthLimit) maxVisibleBooks--;
    return maxVisibleBooks;
  }, [books, heightLimit, widthLimit]);

  useEffect(() => {
    setLimitShowingAssignedBooks((prevState) =>
      Math.max(prevState, initialLimitOnRender)
    );
  }, [initialLimitOnRender]);

  return (
    <td ref={tdRef}>
      <Each
        of={books}
        render={(book) => (
          <span className="badge badge-lg mr-1 truncate">{book.name}</span>
        )}
        empty={<i>No book assigned</i>}
        clamp={limitShowingAssignedBooks}
        expandClampElement={
          <button
            className="badge badge-lg badge-outline"
            onClick={() => setLimitShowingAssignedBooks((prev) => prev + 3)}
          >
            more
          </button>
        }
      />
    </td>
  );
};

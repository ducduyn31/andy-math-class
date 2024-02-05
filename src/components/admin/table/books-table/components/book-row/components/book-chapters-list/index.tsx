import React, { useEffect, useMemo, useState } from "react";
import { Each } from "@/components/each";
import { Chapter } from "@/models";
import { useElementSize } from "usehooks-ts";

interface Props {
  chapters: Chapter[];
  heightLimit?: number;
}

export const BookChaptersList: React.FC<Props> = ({
  chapters,
  heightLimit,
}) => {
  const parentPadding = 12;
  const elementHeight = 24;
  const elementGap = 4;
  const elementPadding = 12;
  const characterWidth = 8;
  const moreButtonWidth = 61;

  const [tdRef, { width: widthLimit }] = useElementSize();
  const [limitShowingChapters, setLimitShowingChapters] = useState(1);

  const initialLimitOnRender = useMemo(() => {
    if (!heightLimit) return chapters.length;
    let maxVisibleChapters = 0;
    let lastRowWidth = 0;
    let currentRowWidth = 0;
    let totalLines = 1;

    for (let i = 0; i < chapters.length; i++) {
      if (!chapters[i]) continue;
      const elementWidth =
        chapters[i].name.length * characterWidth + elementPadding * 2;
      currentRowWidth += elementWidth + elementGap;

      if (currentRowWidth >= widthLimit) {
        lastRowWidth = currentRowWidth;
        currentRowWidth = elementWidth + elementGap;
        totalLines++;
      }
      if (totalLines * elementHeight > heightLimit - 2 * parentPadding) break;
      maxVisibleChapters++;
    }

    if (lastRowWidth + moreButtonWidth >= widthLimit) maxVisibleChapters--;
    return maxVisibleChapters;
  }, [chapters, heightLimit, widthLimit]);

  useEffect(() => {
    setLimitShowingChapters((prevState) =>
      Math.max(prevState, initialLimitOnRender)
    );
  }, [initialLimitOnRender]);

  return (
    <td ref={tdRef}>
      <Each
        of={chapters}
        render={(chapter) => (
          <span className="badge badge-lg mr-1 truncate">{chapter.name}</span>
        )}
        empty={<i>No chapter added</i>}
        expandClampElement={
          <button
            className="badge badge-lg badge-outline"
            onClick={() => setLimitShowingChapters((prev) => prev + 3)}
          >
            more
          </button>
        }
        clamp={limitShowingChapters}
      />
    </td>
  );
};

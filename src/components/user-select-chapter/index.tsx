import React from "react";
import { Chapter } from "@/models";
import { ChapterSelectLabel } from "@/components/user-select-chapter/components/chapter-select-label";
import { useBookContext } from "@/hooks/use-book-context";

interface Props {
  chapter: Chapter;
}

export const UserSelectChapterItem: React.FC<Props> = ({ chapter }) => {
  const { hasChapter } = useBookContext();
  return (
    <>
      <ChapterSelectLabel chapter={chapter} />
      <ul className="w-full pl-5">
        {hasChapter(chapter) &&
          chapter.children?.length &&
          chapter.children.map((subChapter) => (
            <li key={`${subChapter.id}`} className="pr-0 bg-base-300 w-full">
              <UserSelectChapterItem chapter={subChapter} />
            </li>
          ))}
      </ul>
    </>
  );
};

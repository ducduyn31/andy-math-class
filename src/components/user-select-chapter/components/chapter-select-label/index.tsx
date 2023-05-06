import React from "react";
import { useBookContext } from "@/hooks/use-book-context";
import { Chapter } from "@/models";

export const ChapterSelectLabel = (props: { chapter: Chapter }) => {
  const { hasChapter, toggleChapter } = useBookContext();
  return (
    <div
      className="flex justify-between w-full hover:bg-base-300"
      onClick={() => toggleChapter(props.chapter)}
    >
      <p className="py-0">{props.chapter.name}</p>
      <input
        type="checkbox"
        className="checkbox"
        checked={hasChapter(props.chapter)}
        onChange={() => toggleChapter(props.chapter)}
      />
    </div>
  );
};

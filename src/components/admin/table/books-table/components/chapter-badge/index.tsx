import React, { ComponentProps, useCallback } from "react";
import { Chapter } from "@/models";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { UpsertBookFormValues } from "@/helpers/admin/books/form";

interface Props extends ComponentProps<any> {
  chapter: Chapter;
}

export const ChapterBadge: React.FC<Props> = ({ chapter, ...props }) => {
  const { control, setValue } = useFormContext<UpsertBookFormValues>();
  const { remove: removeFromCurrentChapters } =
    useFieldArray<UpsertBookFormValues>({
      name: "chapters",
      control,
    });
  const { removeChapters, chapters } = useWatch<UpsertBookFormValues>({
    control,
  });
  const removeCurrentChapter = useCallback(() => {
    const currentChapterIndex =
      chapters?.findIndex((field) => {
        return field.name === chapter.name;
      }) ?? -1;
    removeFromCurrentChapters(currentChapterIndex);

    if (chapter.id) {
      setValue("removeChapters", [
        ...(removeChapters?.slice() || []),
        chapter.id,
      ]);
    }
  }, [chapter, chapters, removeChapters, removeFromCurrentChapters, setValue]);

  return (
    <button
      {...props}
      type="button"
      className={`badge badge-lg gap-2 mr-1 mt-1 ${chapter?.book?.color ?? ""}`}
    >
      {chapter.name}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-4 h-4 stroke-current cursor-pointer"
        onClick={removeCurrentChapter}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  );
};

import React, { ComponentProps, useCallback, useMemo } from "react";
import { Chapter } from "@/models";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { UpsertBookFormValues } from "@/helpers/admin/books/form";
import { DropdownIcon } from "@/components/admin/table/books-table/components/chapter-badge/components/chapter-icon";
import { assureNumber } from "@/helpers/number";

interface Props extends ComponentProps<any> {
  chapter: Chapter;
  onDropdownToggle?: () => void;
}

export const ChapterBadge: React.FC<Props> = ({
  chapter,
  onDropdownToggle,
  ...props
}) => {
  const { control, setValue } = useFormContext<UpsertBookFormValues>();
  const { remove: removeFromCurrentChapters, swap: swapChapters } =
    useFieldArray<UpsertBookFormValues>({
      name: "chapters",
      control,
    });
  const { removeChapters, chapters } = useWatch<UpsertBookFormValues>({
    control,
  });

  const currentChapter = useMemo(
    () =>
      chapters?.find((field) => {
        return field.id === chapter.id;
      }),
    [chapter.id, chapters]
  );

  const siblingChapters = useMemo(
    () =>
      chapters
        ?.filter((field) => {
          return field.parentId === currentChapter?.parentId;
        })
        ?.sort((a, b) => assureNumber(a.order) - assureNumber(b.order)),
    [chapters, currentChapter?.parentId]
  );

  const findFormChapterIndex = useCallback(
    (chapterName: string) => {
      return (
        chapters?.findIndex((field) => {
          return field.name === chapterName;
        }) ?? -1
      );
    },
    [chapters]
  );

  const currentChapterFormIndex = useMemo(
    () => findFormChapterIndex(chapter.name),
    [chapter.name, findFormChapterIndex]
  );

  const currentChapterOrder = useMemo(
    () => assureNumber(chapters?.[currentChapterFormIndex]?.order),
    [chapters, currentChapterFormIndex]
  );

  const minOrder = useMemo(
    () =>
      Math.min(
        ...(siblingChapters?.map((chapter) => assureNumber(chapter.order)) ||
          [])
      ),
    [siblingChapters]
  );

  const maxOrder = useMemo(
    () =>
      Math.max(
        ...(siblingChapters?.map((chapter) => assureNumber(chapter.order)) ||
          [])
      ),
    [siblingChapters]
  );

  const currentChapterSiblingIndex = useMemo(
    () =>
      siblingChapters?.findIndex((field) => {
        return field.name === chapter.name;
      }) ?? -1,
    [chapter.name, siblingChapters]
  );

  const removeCurrentChapter = useCallback(() => {
    removeFromCurrentChapters(currentChapterFormIndex);

    if (chapter.id) {
      setValue("removeChapters", [
        ...(removeChapters?.slice() || []),
        chapter.id,
      ]);
    }
  }, [
    chapter.id,
    currentChapterFormIndex,
    removeChapters,
    removeFromCurrentChapters,
    setValue,
  ]);

  const swapChapterOrder = useCallback(
    (direction: "up" | "down") => {
      if (direction === "up" && currentChapterOrder > minOrder) {
        const previousChapter =
          siblingChapters?.[currentChapterSiblingIndex - 1];
        const previousChapterFormIndex = findFormChapterIndex(
          previousChapter?.name ?? ""
        );
        const temp = previousChapter?.order;
        setValue(
          `chapters.${previousChapterFormIndex}.order`,
          currentChapterOrder
        );
        setValue(`chapters.${currentChapterFormIndex}.order`, temp);
        swapChapters(currentChapterFormIndex, previousChapterFormIndex);
      } else if (direction === "down" && currentChapterOrder < maxOrder) {
        const nextChapter = siblingChapters?.[currentChapterSiblingIndex + 1];
        const nextChapterFormIndex = findFormChapterIndex(
          nextChapter?.name ?? ""
        );
        const temp = nextChapter?.order;
        setValue(`chapters.${nextChapterFormIndex}.order`, currentChapterOrder);
        setValue(`chapters.${currentChapterFormIndex}.order`, temp);
        swapChapters(currentChapterFormIndex, nextChapterFormIndex);
      }

      console.log(currentChapterOrder, siblingChapters);
    },
    [
      currentChapterFormIndex,
      currentChapterOrder,
      currentChapterSiblingIndex,
      findFormChapterIndex,
      maxOrder,
      minOrder,
      setValue,
      siblingChapters,
      swapChapters,
    ]
  );

  return (
    <div className="flex items-center">
      <DropdownIcon
        width={20}
        height={20}
        className="cursor-pointer"
        onDropdownToggle={onDropdownToggle}
      />
      <div
        {...props}
        className={`text-normal gap-2 mr-1 mt-1 ${chapter?.book?.color ?? ""}`}
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
        {currentChapterOrder > minOrder && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            className="w-4 h-4 inline-block stroke-current cursor-pointer"
            onClick={() => swapChapterOrder("up")}
          >
            <polygon points="25,15 15,35 35,35" stroke="#000" strokeWidth="2" />
          </svg>
        )}
        {currentChapterOrder < maxOrder && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            className="w-4 h-4 inline-block stroke-current cursor-pointer"
            onClick={() => swapChapterOrder("down")}
          >
            <polygon points="25,35 15,15 35,15" stroke="#000" strokeWidth="2" />
          </svg>
        )}
      </div>
    </div>
  );
};

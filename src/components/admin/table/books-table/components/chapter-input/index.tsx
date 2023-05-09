import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { UpsertBookFormValues } from "@/helpers/admin/books/form";
import { ChapterForm } from "@/components/admin/table/books-table/components/chapter-form";
import { ChapterBadge } from "@/components/admin/table/books-table/components/chapter-badge";
import { generateUUID } from "@/helpers/string";
import { Maybe } from "@/models/types";
import { assignBookToChapter, Book, createFullChapter } from "@/models";

interface Props {
  book: Maybe<Book>;
}

export interface FormToggle {
  type: "new" | "child";
  chapterId?: Maybe<string>;
  value: boolean;
}

export const ChapterInput: React.FC<Props> = ({ book }) => {
  const toggleFormState = useState<FormToggle>({
    type: "new",
    value: false,
  });
  const [formTogged, setFormToggled] = toggleFormState;

  const {
    getValues,
    formState: { errors },
  } = useFormContext<UpsertBookFormValues>();

  const toggleForm = async (
    nextValue?: boolean,
    type?: "new" | "child",
    parentId?: string
  ) => {
    const _type = type || "new";
    const _parentId = parentId || null;
    if (typeof nextValue === "boolean") {
      await setFormToggled({
        type: _type,
        value: !nextValue,
        chapterId: _parentId,
      });
      await setFormToggled({
        type: _type,
        value: nextValue,
        chapterId: _parentId,
      });
      return;
    }
    await setFormToggled({
      type: _type,
      value: !formTogged.value,
      chapterId: _parentId,
    });
  };
  const currentChapters = getValues("chapters");

  return (
    <div>
      {currentChapters?.map((chapter) => (
        <ChapterBadge
          chapter={assignBookToChapter(book, createFullChapter(chapter))}
          key={chapter.id || generateUUID()}
          onClick={() => toggleForm(true, "child", chapter.id)}
        />
      ))}
      <button
        type="button"
        className="badge badge-outline badge-primary badge-lg mt-1 mr-1"
        onClick={() => toggleForm(true)}
      >
        Add new chapter
      </button>
      {formTogged.value && <ChapterForm toggleState={toggleFormState} />}
      {errors.chapters && (
        <span className="text-xs text-error ml-2 mt-2">
          {errors.chapters.message}
        </span>
      )}
    </div>
  );
};

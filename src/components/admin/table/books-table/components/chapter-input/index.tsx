import React from "react";
import { useFormContext } from "react-hook-form";
import { UpsertBookFormValues } from "@/helpers/admin/books/form";
import { ChapterForm } from "@/components/admin/table/books-table/components/chapter-form";
import { Maybe } from "@/models/types";
import { Book } from "@/models";
import { ChapterTree } from "@/components/admin/table/books-table/components/chapter-tree";

interface Props {
  book: Maybe<Book>;
}

export interface FormToggle {
  type: "new" | "child";
  chapterId?: Maybe<string>;
  value: boolean;
}

export const ChapterInput: React.FC<Props> = ({ book }) => {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<UpsertBookFormValues>();

  const currentChapters = getValues("chapters");
  const nextOrder =
    currentChapters.filter((chapter) => !chapter.parentId).length + 1;

  return (
    <div>
      <ChapterTree
        bookFormControl={control}
        formChapters={currentChapters}
        book={book}
      />
      <ChapterForm bookFormControl={control} order={nextOrder} />
      {errors.chapters && (
        <span className="text-xs text-error ml-2 mt-2">
          {errors.chapters.message}
        </span>
      )}
    </div>
  );
};

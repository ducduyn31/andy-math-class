import React from "react";
import {
  FormChapterValue,
  UpsertBookFormValues,
} from "@/helpers/admin/books/form";
import { assignBookToChapter, Book, createFullChapter } from "@/models";
import { Maybe } from "@/models/types";
import { assureNumber } from "@/helpers/number";
import { ChapterBadge } from "@/components/admin/table/books-table/components/chapter-badge";
import { generateUUID } from "@/helpers/string";
import { useMap } from "react-use";
import { ChapterForm } from "@/components/admin/table/books-table/components/chapter-form";
import { Control } from "react-hook-form";

interface Props {
  formChapters: FormChapterValue[];
  bookFormControl: Control<UpsertBookFormValues>;
  parent?: Maybe<string>;
  book: Maybe<Book>;
}

export const ChapterTree: React.FC<Props> = ({
  formChapters,
  bookFormControl,
  book,
  parent,
}) => {
  const currentChapters = formChapters
    .filter((chapter) => chapter.parentId === parent)
    .sort((a, b) => assureNumber(a.order) - assureNumber(b.order));

  const [expanded, { set }] = useMap<Record<string, boolean>>();

  return (
    <>
      {currentChapters.map((chapter) => (
        <div key={chapter.id || generateUUID()} data-testid="chapter-entry">
          <ChapterBadge
            chapter={assignBookToChapter(book, createFullChapter(chapter))}
            book={book}
            onDropdownToggle={() => {
              set(chapter.name, !expanded[chapter.name]);
            }}
          />
          {expanded[chapter.name] && (
            <div className="ml-4">
              <ChapterTree
                bookFormControl={bookFormControl}
                formChapters={formChapters}
                parent={chapter.id}
                book={book}
              />
              <ChapterForm
                bookFormControl={bookFormControl}
                parentId={chapter.id}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

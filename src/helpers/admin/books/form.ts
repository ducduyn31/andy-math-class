import * as yup from "yup";
import { Maybe } from "@/models/types";

export interface FormChapterValue {
  id?: string;
  name: string;
  parentId?: Maybe<string>;
  order?: number;
  isNew?: boolean;
}

export interface UpsertBookFormValues {
  id: string;
  name: string;
  chapters: FormChapterValue[];
  removeChapters: string[];
}

export type ChapterTreeNode = FormChapterValue & {
  children?: ChapterTreeType;
};

export type ChapterTreeType = Record<string, ChapterTreeNode>;

export const FormChapterValueSchema = yup.object().shape({
  id: yup.string().nullable(),
  name: yup.string().required("Chapter name is required"),
});

export const UpsertBookFormValuesSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  // chapters validations for duplication names
  chapters: yup
    .array()
    .of(FormChapterValueSchema)
    .test("unique-chapter-names", "Chapter name must be unique", (chapters) => {
      const chapterNames = chapters?.map((chapter) => chapter.name) || [];
      return new Set(chapterNames).size === chapterNames.length;
    }),
  removeChapters: yup.array().of(yup.string()),
});

export const upsertBookForm =
  (upserter: (arg: UpsertBookFormValues) => void) =>
  async (form: UpsertBookFormValues) => {
    await upserter(form);
  };

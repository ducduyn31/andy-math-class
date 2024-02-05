import { Maybe } from "@/models/types";
import * as yup from "yup";
import {
  FileState,
  FileStateCategory,
} from "@/helpers/admin/questions/file-action";
import { QuestionImage } from "@/models";
import { createSortedArrayFromIndexMap } from "@/helpers/array";
import { isSelectableOption, SelectOption } from "@/helpers/form";

export interface UpsertQuestionFormValues {
  id?: Maybe<string>;
  name: string;
  description: Maybe<string>;
  bookSelection: SelectOption;
  chapterSelection: SelectOption;
  questionImages: FileState[];
  answerImages: FileState[];
}

export const UpsertQuestionFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  bookSelection: yup.mixed().test({
    message: "Book is required",
    test: (value) => isSelectableOption(value as SelectOption),
  }),
  chapterSelection: yup.mixed().test({
    message: "Chapter is required",
    test: (value) => isSelectableOption(value as SelectOption),
  }),
});

export const mapOnlineFilesToFileStates = (
  onlineFiles?: QuestionImage[]
): FileState[] => {
  if (!onlineFiles) return [];
  const sortedOnlineFiles = createSortedArrayFromIndexMap(onlineFiles, "order");

  return sortedOnlineFiles.map((file, index) => ({
    state: FileStateCategory.ONLINE,
    value: file.path,
    order: file.order || index,
  }));
};

export const upsertQuestionValues =
  (upserter: (arg: UpsertQuestionFormValues) => void) =>
  async (values: UpsertQuestionFormValues) => {
    upserter(values);
  };

import { Maybe } from "@/models/types";
import * as yup from "yup";
import {
  FileState,
  FileStateCategory,
} from "@/helpers/admin/questions/file-action";
import { QuestionImage } from "@/models";
import { createSortedArrayFromIndexMap } from "@/helpers/array";

export interface UpsertQuestionFormValues {
  id?: Maybe<string>;
  name: string;
  description: Maybe<string>;
  bookId: string;
  chapterId: string;
  questionImages: FileState[];
  answerImages: FileState[];
}

export const UpsertQuestionFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  bookId: yup.string().required("Book is required"),
  chapterId: yup.string().required("Chapter is required"),
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

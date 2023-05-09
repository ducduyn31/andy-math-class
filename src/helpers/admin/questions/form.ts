import { Maybe } from "@/models/types";
import * as yup from "yup";

export interface UpsertQuestionFormValues {
  id?: Maybe<string>;
  name: string;
  description: Maybe<string>;
  bookId: string;
  chapterId: string;
  questionImages: FileList;
  answerImages: FileList;
  deleteQuestionImages: string[];
  deleteAnswerImages: string[];
}

export const UpserQuestionFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  bookId: yup.string().required("Book is required"),
  chapterId: yup.string().required("Chapter is required"),
});

export const upsertQuestionValues =
  (upserter: (arg: UpsertQuestionFormValues) => void) =>
  async (values: UpsertQuestionFormValues) => {
    upserter(values);
  };

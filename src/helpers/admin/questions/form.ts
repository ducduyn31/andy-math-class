import { Maybe } from "@/models/types";
import * as yup from "yup";
import { assureNumber } from "@/helpers/number";

export interface UpsertQuestionFormValues {
  id?: Maybe<string>;
  name: string;
  description: Maybe<string>;
  bookId: string;
  chapterId: string;
  questionImages: FileList; // Minimum 1 image
  answerImages: FileList; // Minimum 1 image
}

export const UpserQuestionFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  bookId: yup.string().required("Book is required"),
  chapterId: yup.string().required("Chapter is required"),
  questionImages: yup
    .mixed()
    .required("At least 1 image is required")
    .test("min-images", "At least 1 image is required", (images) => {
      return assureNumber((images as FileList | null)?.length) > 0;
    }),
  answerImages: yup
    .mixed()
    .required("At least 1 image is required")
    .test("min-images", "At least 1 image is required", (images) => {
      return assureNumber((images as FileList | null)?.length) > 0;
    }),
});

export const upsertQuestionValues =
  (upserter: (arg: UpsertQuestionFormValues) => void) =>
  async (values: UpsertQuestionFormValues) => {
    upserter(values);
  };

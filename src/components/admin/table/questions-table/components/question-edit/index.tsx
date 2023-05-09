import React, { useCallback } from "react";
import { Book, mapToOption, Question } from "@/models";
import { Maybe } from "@/models/types";
import { useModalClose } from "@/hooks/use-modal";
import { FormProvider, useForm } from "react-hook-form";
import {
  UpserQuestionFormSchema,
  UpsertQuestionFormValues,
  upsertQuestionValues,
} from "@/helpers/admin/questions/form";
import { FormInputField } from "@/components/form-input-field";
import { FormSelectField } from "@/components/form-select-field";
import { FormImagePicker } from "@/components/form-image-picker";
import { useUpsertQuestions } from "@/hooks/use-upsert-questions";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

interface Props {
  books: Book[];
  question: Maybe<Question>;
}

export const QuestionModificationModal: React.FC<Props> = ({
  question,
  books,
}) => {
  const { closeCurrentModal } = useModalClose();
  const { upsertQuestions } = useUpsertQuestions({
    onSuccess: () => {
      closeCurrentModal();
      toast.success("Saved successfully");
    },
  });

  const methods = useForm<UpsertQuestionFormValues>({
    mode: "onChange",
    resolver: yupResolver(UpserQuestionFormSchema),
    defaultValues: {
      id: question?.id,
      name: question?.name,
      description: question?.description,
      bookId: question?.book?.id || books[0]?.id,
      chapterId: question?.chapter?.id || books[0]?.chapters[0]?.id,
      deleteQuestionImages: [],
      deleteAnswerImages: [],
    },
  });
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const selectedBookId = watch("bookId");

  const matchCurrentBook = useCallback(
    (book: Book) => book.id === selectedBookId,
    [selectedBookId]
  );

  const updateDeleteFiles = useCallback(
    (name: "deleteQuestionImages" | "deleteAnswerImages") =>
      (deletingFiles: string[]) => {
        setValue(name, deletingFiles);
      },
    [setValue]
  );

  return (
    <>
      <input
        type="checkbox"
        id="question-modification-modal"
        className="modal-toggle"
      />
      <label className="modal modal-bottom sm:modal-middle">
        <label className="modal-box">
          <h3 className="font-bold text-lg">Question modification</h3>
          <FormProvider {...methods}>
            <form
              className="form-control"
              onSubmit={handleSubmit(upsertQuestionValues(upsertQuestions))}
            >
              <FormInputField
                label="Question name"
                className="input input-bordered w-full"
                errorMessage={errors.name?.message}
                {...register("name")}
              />
              <FormInputField
                label="Description"
                className="input input-bordered w-full"
                errorMessage={errors.description?.message}
                {...register("description")}
              />
              <FormSelectField
                label="Book"
                options={books.map(mapToOption) || []}
                errorMessage={errors.bookId?.message}
                {...register("bookId")}
              />
              <FormSelectField
                label="Chapter"
                options={
                  books
                    .filter(matchCurrentBook)?.[0]
                    ?.chapters.map(mapToOption) || []
                }
                errorMessage={errors.chapterId?.message}
                {...register("chapterId")}
              />
              <FormImagePicker
                multiple
                label="Question image"
                accept="image/*"
                existingImages={question?.questionImages || []}
                errorMessage={errors.questionImages?.message}
                onDeleteSelect={updateDeleteFiles("deleteQuestionImages")}
                {...register("questionImages")}
              />
              <FormImagePicker
                multiple
                label="Answer image"
                accept="image/*"
                existingImages={question?.answerImages || []}
                errorMessage={errors.answerImages?.message}
                onDeleteSelect={updateDeleteFiles("deleteAnswerImages")}
                {...register("answerImages")}
              />
              <div className="modal-action mt-5">
                <button
                  type="button"
                  className="btn"
                  onClick={closeCurrentModal}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={!isValid}
                >
                  Save
                </button>
              </div>
            </form>
          </FormProvider>
        </label>
      </label>
    </>
  );
};

import React from "react";
import { Question } from "@/models";
import { Maybe } from "@/models/types";
import { useModalClose } from "@/hooks/use-modal";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  mapOnlineFilesToFileStates,
  UpsertQuestionFormSchema,
  UpsertQuestionFormValues,
  upsertQuestionValues,
} from "@/helpers/admin/questions/form";
import { FormInputField } from "@/components/form-input-field";
import { RHFormImagePicker } from "@/components/form-image-picker";
import { useUpsertQuestions } from "@/hooks/use-upsert-questions";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { FormSelectBook } from "@/components/form-select-book";
import { FormSelectChapter } from "@/components/form-select-chapter";
import { mapBookToOption, mapChapterToOption } from "@/helpers/admin/options";
import { useUpdateEffect } from "usehooks-ts";
import { SelectOptions } from "@/helpers/form";

interface Props {
  question: Maybe<Question>;
}

export const QuestionModificationModal: React.FC<Props> = ({ question }) => {
  const { closeCurrentModal } = useModalClose();
  const { upsertQuestions, loading } = useUpsertQuestions({
    onSuccess: () => {
      closeCurrentModal();
      toast.success("Saved successfully");
    },
  });

  const methods = useForm<UpsertQuestionFormValues>({
    mode: "onChange",
    resolver: yupResolver(UpsertQuestionFormSchema),
    defaultValues: {
      id: question?.id,
      name: question?.name,
      description: question?.description,
      bookSelection: mapBookToOption(question?.book),
      chapterSelection: mapChapterToOption(question?.chapter),
      questionImages: mapOnlineFilesToFileStates(question?.questionImages),
      answerImages: mapOnlineFilesToFileStates(question?.answerImages),
    },
  });
  const {
    register,
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  useUpdateEffect(() => {
    setValue("chapterSelection", SelectOptions.ANY_DEFAULT);
  }, [getValues("bookSelection.uniqueKey")]);

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
              <Controller
                name="bookSelection"
                control={control}
                render={({ field }) => (
                  <FormSelectBook label="Book" size="md" {...field} />
                )}
              />
              <Controller
                name="chapterSelection"
                control={control}
                render={({ field }) => (
                  <FormSelectChapter
                    label="Chapter"
                    size="md"
                    bookSelection={watch("bookSelection")}
                    {...field}
                  />
                )}
              />
              <RHFormImagePicker
                label="Question image"
                accept="image/*"
                filesInputName="questionImages"
                errorMessage={errors.questionImages?.message}
              />
              <RHFormImagePicker
                label="Answer image"
                accept="image/*"
                errorMessage={errors.answerImages?.message}
                filesInputName="answerImages"
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
                  disabled={!isValid || loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </FormProvider>
        </label>
      </label>
    </>
  );
};

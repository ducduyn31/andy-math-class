import React from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import {
  FormChapterValue,
  FormChapterValueSchema,
  UpsertBookFormValues,
} from "@/helpers/admin/books/form";
import { yupResolver } from "@hookform/resolvers/yup";

export const ChapterInput: React.FC = () => {
  const { append } = useFieldArray<UpsertBookFormValues>({
    name: "chapters",
  });
  const {
    formState: { errors },
  } = useFormContext<UpsertBookFormValues>();

  const subForm = useForm<FormChapterValue>({
    mode: "onChange",
    resolver: yupResolver(FormChapterValueSchema),
  });

  const addNewChapter = (newChapter: FormChapterValue) => {
    append({ name: newChapter.name });
    subForm.reset({ name: "", id: undefined });
  };

  return (
    <>
      <div className="flex w-full items-center mt-3">
        <input
          type="text"
          placeholder="Add chapter"
          className="input input-bordered"
          {...subForm.register("name")}
        />
        <button
          type="submit"
          className="btn ml-2 btn-info flex-1"
          onClick={subForm.handleSubmit(addNewChapter)}
          disabled={!subForm.formState.isValid}
        >
          Add
        </button>
      </div>
      {errors.chapters && (
        <span className="text-xs text-error ml-2 mt-2">
          {errors.chapters.message}
        </span>
      )}
      {subForm.formState.errors.name && (
        <span className="text-xs text-error ml-2 mt-2">
          {subForm.formState.errors.name.message}
        </span>
      )}
    </>
  );
};

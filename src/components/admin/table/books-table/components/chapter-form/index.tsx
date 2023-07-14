import React from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import {
  FormChapterValue,
  FormChapterValueSchema,
  UpsertBookFormValues,
} from "@/helpers/admin/books/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateUUID } from "@/helpers/string";
import { useToggle } from "react-use";

interface Props {
  order?: number;
  parentId?: string;
  bookFormControl: Control<UpsertBookFormValues>;
}

export const ChapterForm: React.FC<Props> = ({
  bookFormControl,
  parentId,
  order = 0,
}) => {
  const [toggled, toggle] = useToggle(false);
  const { append } = useFieldArray<UpsertBookFormValues>({
    name: "chapters",
    control: bookFormControl,
  });

  const subForm = useForm<FormChapterValue>({
    mode: "onChange",
    resolver: yupResolver(FormChapterValueSchema),
  });

  const addNewChapter = (newChapter: FormChapterValue) => {
    append({
      id: generateUUID(),
      name: newChapter.name,
      isNew: true,
      parentId,
      order,
    });
    toggle();
    subForm.resetField("name");
  };

  if (!toggled) {
    return (
      <button
        type="button"
        className="badge badge-outline badge-primary badge-lg mt-1 mr-1"
        onClick={toggle}
      >
        Add new chapter
      </button>
    );
  }

  return (
    <div className="flex w-full items-center mt-3">
      <input
        type="text"
        placeholder="Chapter ..."
        className="input input-bordered"
        {...subForm.register("name")}
      />
      <button
        type="submit"
        className="btn ml-2 btn-info flex-1"
        onClick={subForm.handleSubmit(addNewChapter)}
        disabled={!subForm.formState.isValid}
      >
        Add Chapter
      </button>

      {subForm.formState.errors.name && (
        <span className="text-xs text-error ml-2 mt-2">
          {subForm.formState.errors.name.message}
        </span>
      )}
    </div>
  );
};

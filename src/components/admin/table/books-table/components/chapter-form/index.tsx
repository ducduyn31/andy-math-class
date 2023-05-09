import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  FormChapterValue,
  FormChapterValueSchema,
  UpsertBookFormValues,
} from "@/helpers/admin/books/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormToggle } from "@/components/admin/table/books-table/components/chapter-input";

interface Props {
  toggleState: [FormToggle, React.Dispatch<React.SetStateAction<FormToggle>>];
}

export const ChapterForm: React.FC<Props> = ({
  toggleState: [toggleState, setToggleState],
}) => {
  const { append } = useFieldArray<UpsertBookFormValues>({
    name: "chapters",
  });

  const subForm = useForm<FormChapterValue>({
    mode: "onChange",
    resolver: yupResolver(FormChapterValueSchema),
  });

  const addNewChapter = (newChapter: FormChapterValue) => {
    append({ name: newChapter.name, parentId: toggleState.chapterId });
    setToggleState({ type: "new", value: false });
  };

  return (
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
        {toggleState.type === "new" ? "Add new chapter" : "Add child chapter"}
      </button>

      {subForm.formState.errors.name && (
        <span className="text-xs text-error ml-2 mt-2">
          {subForm.formState.errors.name.message}
        </span>
      )}
    </div>
  );
};

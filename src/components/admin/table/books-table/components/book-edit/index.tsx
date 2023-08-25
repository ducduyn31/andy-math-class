import React from "react";
import { Book } from "@/models";
import { FormProvider, useForm } from "react-hook-form";
import {
  mapDefaultBookFormValues,
  upsertBookForm,
  UpsertBookFormValues,
  UpsertBookFormValuesSchema,
} from "@/helpers/admin/books/form";
import { FormInputField } from "@/components/form-input-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModalClose } from "@/hooks/use-modal";
import { Maybe } from "@/models/types";
import { ChapterInput } from "@/components/admin/table/books-table/components/chapter-input";
import { useUpsertBook } from "@/hooks/use-upsert-book";
import toast from "react-hot-toast";

interface Props {
  book: Maybe<Book>;
}

export const BookModificationModal: React.FC<Props> = ({ book }: Props) => {
  const { closeCurrentModal } = useModalClose();

  const { upsertBook } = useUpsertBook({
    onSuccess: () => {
      toast.success("Saved successfully");
      closeCurrentModal();
    },
  });

  const methods = useForm<UpsertBookFormValues>({
    resolver: yupResolver(UpsertBookFormValuesSchema),
    defaultValues: mapDefaultBookFormValues(book),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = methods;

  return (
    <>
      <input
        type="checkbox"
        id="book-modification-modal"
        className="modal-toggle"
      />
      <label className="modal modal-bottom sm:modal-middle">
        <label className="modal-box">
          <h3 className="font-bold text-lg">Book modification</h3>
          <FormProvider {...methods}>
            <form
              className="form-control"
              onSubmit={handleSubmit(upsertBookForm(upsertBook))}
            >
              <FormInputField
                label="Book name"
                className="input input-bordered w-full"
                errorMessage={errors.name?.message}
                {...register("name")}
              />
              <label className="label">
                <span className="label-text">Chapter</span>
              </label>
              <ChapterInput book={book} />

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

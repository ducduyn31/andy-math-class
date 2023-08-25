import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  updateUserForm,
  UpdateUserFormValues,
  UpdateUserFormValuesSchema,
} from "@/helpers/admin/users/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputField } from "@/components/form-input-field";
import { Book, User } from "@/models";
import { assureNumber } from "@/helpers/number";
import { useUpdateUser } from "@/hooks/use-update-user";
import React from "react";
import { useModalClose } from "@/hooks/use-modal";

interface Props {
  user: User;
  availableBooks: Book[];
}

export const UserModificationModal: React.FC<Props> = ({
  user,
  availableBooks,
}: Props) => {
  const { closeCurrentModal } = useModalClose();

  const { updateUser } = useUpdateUser({
    onSuccess: () => {
      toast.success("Saved successfully!");
      closeCurrentModal();
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUserFormValues>({
    resolver: yupResolver(UpdateUserFormValuesSchema),
    defaultValues: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      assignedBookIds: user.assignedBooks?.map((book) => book.id),
    },
  });

  const onCheckAssignedBook = (isChecked: boolean, book: Book) => {
    const formAssignedBooks = watch("assignedBookIds");
    if (isChecked) {
      setValue("assignedBookIds", [...(formAssignedBooks || []), book.id]);
    } else {
      setValue(
        "assignedBookIds",
        formAssignedBooks?.filter((bookId) => bookId !== book.id)
      );
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="user-modification-modal"
        className="modal-toggle"
      />
      <label className="modal modal-bottom sm:modal-middle">
        <label className="modal-box" htmlFor={""}>
          <h3 className="font-bold text-lg">User modification</h3>
          <form
            className="form-control"
            onSubmit={handleSubmit(updateUserForm(updateUser))}
          >
            <FormInputField
              label="First name"
              className="input input-bordered w-full"
              errorMessage={errors.firstName?.message}
              {...register("firstName")}
            />
            <FormInputField
              label="Last name"
              className="input input-bordered w-full"
              errorMessage={errors.lastName?.message}
              {...register("lastName")}
            />
            <FormInputField
              label="Email"
              className="input input-bordered w-full"
              errorMessage={errors.email?.message}
              {...register("email")}
            />

            {assureNumber(availableBooks?.length) > 0 && (
              <label className="label">
                <span className="label-text">Books</span>
              </label>
            )}

            {availableBooks?.map((book, i) => (
              <label
                key={i}
                className="label cursor-pointer relative"
                data-testid="book-assignment"
              >
                <span className="btn w-full"> {book.name} </span>
                <input
                  type="checkbox"
                  checked={watch("assignedBookIds")?.includes(book.id)}
                  onChange={(event) =>
                    onCheckAssignedBook(event.target.checked, book)
                  }
                  className="checkbox checkbox-accent absolute right-5 border-2"
                />
              </label>
            ))}
            <div className="modal-action mt-2">
              <button type="button" onClick={closeCurrentModal} className="btn">
                Close
              </button>

              <button className="btn btn-success" type="submit">
                Save
              </button>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

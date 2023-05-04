import { AdminUserRowProps } from "@/components/admin/table/users-table/components/user-row";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  updateUserForm,
  UpdateUserFormValues,
  UpdateUserFormValuesSchema,
} from "@/helpers/admin/users/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputField } from "@/components/form-input-field";
import { useGetAssignedBooksByUserIdQuery } from "@/gql/types";
import { mapAssignedBook, mapBook } from "@/models";
import { assureNonNull } from "@/helpers/array";
import { assureNumber } from "@/helpers/number";
import { useUpdateUser } from "@/hooks/use-update-user";
import React from "react";
import { useModalClose } from "@/hooks/use-modal";

interface Props {
  user: AdminUserRowProps;
}

export const UserModificationModal: React.FC<Props> = ({ user }: Props) => {
  const { data: assignedBooksData } = useGetAssignedBooksByUserIdQuery({
    variables: {
      userId: user.id,
    },
  });

  const { closeCurrentModal } = useModalClose();

  const { updateUser } = useUpdateUser({
    onSuccess: () => {
      toast.success("Saved successfully!");
      closeCurrentModal();
    },
  });

  const availableBooks = assignedBooksData?.booksCollection?.edges.map(mapBook);
  const assignedBooks = assureNonNull(
    assignedBooksData?.user_books_assignationCollection?.edges?.map(
      mapAssignedBook
    )
  );

  const {
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
    },
  });

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
              <label key={i} className="label cursor-pointer relative">
                <span className={"btn w-full"}> {book.name} </span>
                <input
                  type="checkbox"
                  defaultChecked={assignedBooks.includes(book)}
                  className="checkbox checkbox-accent absolute right-5 border-2"
                />
              </label>
            ))}
            <div className="modal-action mt-2">
              <button onClick={closeCurrentModal} className="btn">
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

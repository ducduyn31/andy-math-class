import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import {
  updateUserForm,
  UpdateUserFormValues,
  UpdateUserFormValuesSchema,
} from "@/helpers/admin/users/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputField } from "@/components/form-input-field";
import { User } from "@/models";
import { useUpdateUser } from "@/hooks/use-update-user";
import React from "react";
import { useModalClose } from "@/hooks/use-modal";
import { AssignBooksField } from "@/components/admin/table/users-table/components/user-edit/components/assign-books-field";
import { mapAssignedBooksToOptions } from "@/helpers/admin/options";

interface Props {
  user: User;
}

export const UserModificationModal: React.FC<Props> = ({ user }: Props) => {
  const { closeCurrentModal } = useModalClose();

  const { updateUser } = useUpdateUser({
    onSuccess: () => {
      toast.success("Saved successfully!");
      closeCurrentModal();
    },
  });

  const methods = useForm<UpdateUserFormValues>({
    resolver: yupResolver(UpdateUserFormValuesSchema),
    defaultValues: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      assignedBookIds: mapAssignedBooksToOptions(user.assignedBooks),
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <>
      <input
        type="checkbox"
        id="user-modification-modal"
        className="modal-toggle"
      />
      <label className="modal modal-bottom sm:modal-middle">
        <label className="modal-box" htmlFor={""}>
          <h3 className="font-bold text-lg">Edit User</h3>
          <FormProvider {...methods}>
            <form
              className="form-control gap-y-3"
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
              <FormInputField
                label="Is Admin"
                className="toggle"
                type="checkbox"
                inline
                {...register("isAdmin")}
              />

              <AssignBooksField label="Books" />

              <div className="modal-action mt-2">
                <button
                  type="button"
                  onClick={closeCurrentModal}
                  className="btn"
                >
                  Close
                </button>

                <button className="btn btn-success" type="submit">
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

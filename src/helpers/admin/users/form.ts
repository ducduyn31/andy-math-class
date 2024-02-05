import * as yup from "yup";
import { UseUpdateUserArgs } from "@/hooks/use-update-user";
import { isSelectableOption, SelectOption } from "@/helpers/form";
import { assureNonNull } from "@/helpers/array";

export interface UpdateUserFormValues {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  assignedBookIds?: SelectOption[];
  isEnabled?: boolean;
  isAdmin?: boolean;
}

export const UpdateUserFormValuesSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
});

export const updateUserForm =
  (update: (args: UseUpdateUserArgs) => void) =>
  async (values: UpdateUserFormValues) => {
    const { assignedBookIds, ...rest } = values;
    const newAssignedBookIds = assureNonNull<string>(
      assignedBookIds?.map((opt) => {
        if (!isSelectableOption(opt)) {
          return null;
        }
        return opt.value;
      })
    );
    update({
      ...rest,
      assignedBookIds: newAssignedBookIds,
    });
  };

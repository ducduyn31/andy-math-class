import * as yup from "yup";
import { UseUpdateUserArgs } from "@/hooks/use-update-user";

export interface UpdateUserFormValues {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const UpdateUserFormValuesSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
});

export const updateUserForm =
  (update: (args: UseUpdateUserArgs) => void) =>
  async (values: UpdateUserFormValues) => {
    await update(values);
  };

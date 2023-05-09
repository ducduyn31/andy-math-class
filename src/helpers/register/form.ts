import * as yup from "yup";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
}

export const RegisterFormValuesSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
});

export const submitRegisterForm =
  (updater: (args: RegisterFormValues) => Promise<void>) =>
  async (values: RegisterFormValues) => {
    await updater(values);
  };

import * as yup from "yup";

export interface UpdateUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export const UpdateUserFormValuesSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
});

export const updateUserForm = (values: UpdateUserFormValues) => {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
  };
};

import * as yup from "yup";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/database";
import { signIn } from "next-auth/react";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const submitRegisterForm =
  (client: SupabaseClient<Database>) => async (values: RegisterFormValues) => {
    const { error } = await client.from("users").insert({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      emailVerified: "now()",
    });
    if (error) throw error;
    await signIn("email", { email: values.email, callbackUrl: "/" });
  };

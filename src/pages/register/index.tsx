import { ReactElement } from "react";
import Layout from "@/layout/Layout";
import { useForm } from "react-hook-form";
import {
  RegisterFormValues,
  RegisterFormValuesSchema,
  submitRegisterForm,
} from "@/helpers/register/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputField } from "@/components/form-input-field";
import { NextPageWithLayout } from "@/pages/_app";
import { useSignUp } from "@/hooks/use-sign-up";

const RegisterPage: NextPageWithLayout = () => {
  const { signUp, loading } = useSignUp();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    resolver: yupResolver(RegisterFormValuesSchema),
  });

  return (
    <div className="flex justify-center mt-5">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Complete your Sign up</h2>
          <form
            className="form-control w-full max-w-xs"
            onSubmit={handleSubmit(submitRegisterForm(signUp))}
          >
            <FormInputField
              type="text"
              label="First name"
              errorMessage={errors.firstName?.message}
              className={`input input-bordered w-full max-w-xs ${
                errors.firstName ? "input-error" : ""
              }`}
              {...register("firstName")}
            />
            <FormInputField
              label="Last name"
              errorMessage={errors.lastName?.message}
              className={`input input-bordered w-full max-w-xs ${
                errors.lastName ? "input-error" : ""
              }
            `}
              {...register("lastName")}
            />
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
RegisterPage.getLayout = (page: ReactElement) => {
  return <Layout> {page} </Layout>;
};

export default RegisterPage;

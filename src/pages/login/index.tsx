import { ReactElement, useState } from "react";
import Layout from "@/layout/Layout";
import { useForm } from "react-hook-form";
import {
  EmailLoginFormValues,
  EmailLoginFormValuesSchema,
  loginWithEmail,
} from "@/helpers/login/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputField } from "@/components/form-input-field";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailLoginFormValues>({
    resolver: yupResolver(EmailLoginFormValuesSchema),
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login With Email</h2>
          <form
            className="form-control w-full max-w-xs"
            onSubmit={handleSubmit(async (values) => {
              setIsSubmitting(true);
              await loginWithEmail(values);
            })}
          >
            <FormInputField
              label="Email"
              errorMessage={errors.email?.message}
              {...register("email")}
              className="input input-bordered w-full max-w-xs"
            />

            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-block">
                    <span className="align-middle">Please wait</span>
                    <i className="align-top loading loading-dots loading-sm"></i>
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginPage.getLayout = (page: ReactElement) => {
  return <Layout> {page} </Layout>;
};

export default LoginPage;

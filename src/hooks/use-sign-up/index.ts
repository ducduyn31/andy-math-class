import { RegisterFormValues } from "@/helpers/register/form";
import { useSignUpMutation } from "@/gql/types";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export const useSignUp = () => {
  const [updateUser, { loading }] = useSignUpMutation();
  const session = useSession();

  const signUp = useCallback(
    async (values: RegisterFormValues) => {
      if (!session.data?.user?.email) return;
      await updateUser({
        variables: {
          email: session.data.user.email,
          newUser: {
            firstName: values.firstName,
            lastName: values.lastName,
          },
        },
      });
    },
    [session, updateUser]
  );

  return {
    signUp,
    loading,
  };
};

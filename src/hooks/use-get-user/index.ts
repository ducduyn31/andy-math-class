import { useGetUserQuery } from "@/gql/types";
import { assureNumber } from "@/helpers/number";
import { mapUser } from "@/models";
import { useSession } from "next-auth/react";

export const useGetMe = () => {
  const { data: session } = useSession();
  const myEmail = session?.user?.email;
  const { data, loading } = useGetUserQuery({
    variables: {
      email: {
        eq: myEmail,
      },
    },
    skip: !myEmail,
  });

  const currentUser = data?.usersCollection?.edges[0].node;

  return {
    loading,
    isAdmin: currentUser?.isAdmin || false,
    me: mapUser({
      isAdmin: !!currentUser?.isAdmin,
      isEnabled: !!currentUser?.isEnabled,
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      id: currentUser?.id || "",
    }),
  };
};

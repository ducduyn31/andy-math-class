import { useGetUserQuery } from "@/gql/types";
import { assureNumber } from "@/helpers/number";
import { mapUser } from "@/models";

export const useGetMe = () => {
  const { data, loading } = useGetUserQuery();

  const currentUser = data?.usersCollection?.edges[0].node;
  const isAdmin = assureNumber(data?.usersCollection?.edges) > 0;

  const userGQL = !isAdmin ? currentUser : null;

  return {
    loading,
    isAdmin,
    me: userGQL
      ? mapUser({
          isAdmin,
          isEnabled: !!currentUser?.isEnabled,
          firstName: currentUser?.firstName || "",
          lastName: currentUser?.lastName || "",
          email: currentUser?.email || "",
          id: currentUser?.id || "",
        })
      : null,
  };
};

import {
  GetUsersQueryVariables,
  Maybe,
  useGetUsersLazyQuery,
} from "@/gql/types";
import { mapUserFromGetUsersQuery, User } from "@/models";
import { useState } from "react";
import { useEffectOnce } from "@/hooks/use-effect-once";
import { isNullOrUndefined } from "@/helpers/valid";

interface UseGetAllUsersArgs {
  lazy?: boolean;
}

interface FilterUsersArgs {
  email?: Maybe<string>;
  status?: Maybe<boolean>;
}

export const useGetAllUsers = (args?: UseGetAllUsersArgs) => {
  const [result, setResult] = useState<User[]>([]);
  const [getUsers, { data: usersData, loading: getUsersLoading, fetchMore }] =
    useGetUsersLazyQuery({
      variables: {
        limit: 30,
      },
      onCompleted: (result) => {
        setResult(mapUserFromGetUsersQuery(result));
      },
    });

  useEffectOnce(() => {
    if (!args?.lazy) {
      getUsers();
    }
  });

  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const fetchNextPage = async () => {
    setFetchMoreLoading(true);
    await fetchMore({
      variables: {
        cursor: usersData?.usersCollection?.pageInfo?.endCursor,
      },
    }).finally(() => setFetchMoreLoading(false));
  };

  const filterUsers = (args?: FilterUsersArgs) => {
    const { status, email } = args || {};

    const filterObject: Partial<GetUsersQueryVariables> = {};

    if (!isNullOrUndefined(status)) {
      filterObject.statusFilter = {
        eq: status,
      };
    }

    if (!isNullOrUndefined(email)) {
      filterObject.emailFilter = {
        like: "%" + email + "%",
      };
    }

    getUsers({
      variables: {
        ...filterObject,
        limit: 30,
      },
    });
  };

  return {
    users: result,
    loading: getUsersLoading || fetchMoreLoading,
    fetchMore: fetchNextPage,
    hasNextPage: usersData?.usersCollection?.pageInfo?.hasNextPage,
    filterUsers,
  };
};

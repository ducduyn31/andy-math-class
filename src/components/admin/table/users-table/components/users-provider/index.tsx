import React, { PropsWithChildren } from "react";
import { User } from "@/models";
import { useGetAllUsers } from "@/hooks/use-get-all-users";
import { Maybe } from "@/gql/types";

interface SupportedFilter {
  email?: Maybe<string>;
  status?: Maybe<boolean>;
}

type UsersContextType = {
  users: User[];
  externalLoadComplete?: boolean;
  externalLoading?: boolean;
  loadFromExternalSource?: () => Promise<void>;
  filterUsers?: (args?: SupportedFilter) => void;
};

const defaultContext: UsersContextType = {
  users: [],
  externalLoadComplete: true,
  externalLoading: false,
};

const UsersContext = React.createContext<UsersContextType>(defaultContext);

interface Props extends PropsWithChildren {}

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const { users, hasNextPage, loading, fetchMore, filterUsers } =
    useGetAllUsers();

  return (
    <UsersContext.Provider
      value={{
        users,
        externalLoadComplete: !hasNextPage,
        externalLoading: loading,
        loadFromExternalSource: fetchMore,
        filterUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => React.useContext(UsersContext);

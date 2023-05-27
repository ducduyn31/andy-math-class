import { User } from "@/models";
import { FilterBuilder } from "@/components/admin/components/content-filter/shared/filter-builder";
import React, { useContext, useMemo, useState } from "react";
import { useAdminContext } from "@/hooks/use-admin-context";

export type UserFilterContextType = {
  filteredUsers: User[];
  userFilters: FilterBuilder<User> | null;
  setUserFilters: (filters: FilterBuilder<User> | null) => void;
};

export const UserFilterContextDefaultValue: UserFilterContextType = {
  filteredUsers: [],
  userFilters: null,
  setUserFilters: () => {},
};

export interface UserFilterReturn {
  type: "user";
  filteredUsers: User[];
  applyFilters: (filterBuilder: FilterBuilder<User> | null) => void;
}

export const useUserFilterContext = (): UserFilterContextType => {
  const { users } = useAdminContext();
  const [userFilters, setUserFilters] = useState<FilterBuilder<User> | null>(
    null
  );

  const filteredUsers = useMemo(() => {
    if (!userFilters) return users;
    return userFilters.apply(users);
  }, [users, userFilters]);

  return {
    filteredUsers,
    userFilters,
    setUserFilters,
  };
};

export const useUserFilter = <C extends UserFilterContextType>(
  context: React.Context<C>
) => {
  const { filteredUsers, setUserFilters } = useContext(context);

  const applyUserFilters = (filterBuilder: FilterBuilder<User> | null) => {
    setUserFilters(filterBuilder);
  };

  return {
    applyUserFilters,
    filteredUsers,
  };
};

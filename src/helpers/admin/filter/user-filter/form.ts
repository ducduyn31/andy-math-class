import { Maybe } from "@/models/types";
import {
  FilterStrategy,
  FilterStrategyCategory,
} from "@/components/admin/components/content-filter/shared/strategies";
import { FilterBuilder } from "@/components/admin/components/content-filter/shared/filter-builder";
import { User } from "@/models";
import { assureNonNull } from "@/helpers/array";

export interface FilterUserFormValues {
  email: Maybe<string>;
  book: Maybe<string>;
  status: "any" | "true" | "false";
}

export const buildUserFilters = (
  filters: FilterUserFormValues
): FilterBuilder<User> => {
  const emailFilterStrategy: FilterStrategy<User> = {
    type: FilterStrategyCategory.TEXT,
    params: {
      match: filters.email || null,
      mapper: (user: User) => user.email,
    },
  };
  const bookFilterStrategy: FilterStrategy<User> = {
    type: FilterStrategyCategory.INCLUDE,
    params: {
      match: filters.book || "any",
      mapper: (user: User) =>
        assureNonNull(user.assignedBooks?.map((book) => book.id)),
    },
  };
  const statusFilterStrategy: FilterStrategy<User> = {
    type: FilterStrategyCategory.SELECT,
    params: {
      match: filters.status || "any",
      mapper: (user: User) => `${user.isEnabled}`,
    },
  };

  const filterBuilder = new FilterBuilder<User>();
  filterBuilder.addFilter(
    emailFilterStrategy,
    bookFilterStrategy,
    statusFilterStrategy
  );
  return filterBuilder;
};

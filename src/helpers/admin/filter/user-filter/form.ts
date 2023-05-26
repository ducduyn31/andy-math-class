import { Maybe } from "@/models/types";
import {
  FilterStrategy,
  FilterStrategyCategory,
} from "@/components/admin/components/content-filter/shared/strategies";
import { FilterBuilder } from "@/components/admin/components/content-filter/shared/filter-builder";
import { User } from "@/models";
import { Mappers } from "@/helpers/mappers";

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
      mapper: Mappers.MAP_USER_EMAIL,
    },
  };
  const bookFilterStrategy: FilterStrategy<User> = {
    type: FilterStrategyCategory.INCLUDE,
    params: {
      match: filters.book || "any",
      mapper: Mappers.MAP_USER_ASSIGNED_BOOKS,
    },
  };
  const statusFilterStrategy: FilterStrategy<User> = {
    type: FilterStrategyCategory.SELECT,
    params: {
      match: filters.status || "any",
      mapper: Mappers.MAP_USER_IS_ENABLED,
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

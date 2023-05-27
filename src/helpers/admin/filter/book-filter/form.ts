import { Maybe } from "@/models/types";
import { FilterBuilder } from "@/components/admin/components/content-filter/shared/filter-builder";
import { Book } from "@/models";
import {
  FilterStrategy,
  FilterStrategyCategory,
} from "@/components/admin/components/content-filter/shared/strategies";
import { Mappers } from "@/helpers/mappers";

export interface FilterBookFormValues {
  title: Maybe<string>;
}

export const buildBookFilters = (
  filters: FilterBookFormValues
): FilterBuilder<Book> => {
  const titleFilterStrategy: FilterStrategy<Book> = {
    type: FilterStrategyCategory.TEXT,
    params: {
      match: filters.title || null,
      mapper: Mappers.MAP_BOOK_NAME,
    },
  };

  const filterBuilder = new FilterBuilder<Book>();
  filterBuilder.addFilter(titleFilterStrategy);
  return filterBuilder;
};

export const mapFilterToBookFormValues = (
  filter: FilterBuilder<Book>
): FilterBookFormValues => ({
  title: filter?.getMatchValueByMapper(Mappers.MAP_BOOK_NAME),
});

import { Maybe } from "@/models/types";
import { FilterBuilder } from "@/components/admin/components/content-filter/shared/filter-builder";
import { Question } from "@/models";
import {
  FilterStrategy,
  FilterStrategyCategory,
} from "@/components/admin/components/content-filter/shared/strategies";
import { Mappers } from "@/helpers/mappers";

export interface FilterQuestionFormValues {
  book: Maybe<string>;
  chapter: Maybe<string>;
}

export const buildQuestionFilters = (
  filters: FilterQuestionFormValues
): FilterBuilder<Question> => {
  const bookFilterStrategy: FilterStrategy<Question> = {
    type: FilterStrategyCategory.SELECT,
    params: {
      match: filters.book || "any",
      mapper: Mappers.MAP_QUESTION_BOOK_ID,
    },
  };
  const chapterFilterStrategy: FilterStrategy<Question> = {
    type: FilterStrategyCategory.SELECT,
    params: {
      match: filters.chapter || "any",
      mapper: Mappers.MAP_QUESTION_CHAPTER_ID,
    },
  };

  const filterBuilder = new FilterBuilder<Question>();
  filterBuilder.addFilter(bookFilterStrategy, chapterFilterStrategy);
  return filterBuilder;
};

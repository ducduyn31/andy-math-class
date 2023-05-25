import { Maybe } from "@/models/types";
import { FilterBuilder } from "@/components/admin/components/content-filter/shared/filter-builder";
import { Question } from "@/models";
import {
  FilterStrategy,
  FilterStrategyCategory,
} from "@/components/admin/components/content-filter/shared/strategies";

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
      mapper: (question: Question) => question.book?.id || "",
    },
  };
  const chapterFilterStrategy: FilterStrategy<Question> = {
    type: FilterStrategyCategory.SELECT,
    params: {
      match: filters.chapter || "any",
      mapper: (question: Question) => question.chapter?.id || "",
    },
  };

  const filterBuilder = new FilterBuilder<Question>();
  filterBuilder.addFilter(bookFilterStrategy, chapterFilterStrategy);
  return filterBuilder;
};

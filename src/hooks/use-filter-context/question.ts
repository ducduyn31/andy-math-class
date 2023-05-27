import { Question } from "@/models";
import { FilterBuilder } from "@/components/admin/components/content-filter/shared/filter-builder";
import { useAdminContext } from "@/hooks/use-admin-context";
import React, { useContext, useMemo, useState } from "react";

export type QuestionFilterContextType = {
  filteredQuestions: Question[];
  questionFilters: FilterBuilder<Question> | null;
  setQuestionFilters: (filters: FilterBuilder<Question> | null) => void;
};

export const QuestionFilterContextDefaultValue: QuestionFilterContextType = {
  filteredQuestions: [],
  questionFilters: null,
  setQuestionFilters: () => {},
};

export interface QuestionFilterReturn {
  type: "question";
  filteredQuestions: Question[];
  applyFilters: (filterBuilder: FilterBuilder<Question> | null) => void;
}

export const useQuestionFilterContext = (): QuestionFilterContextType => {
  const { questions } = useAdminContext();
  const [questionFilters, setQuestionFilters] =
    useState<FilterBuilder<Question> | null>(null);

  const filteredQuestions = useMemo(() => {
    if (!questionFilters) return questions;
    return questionFilters.apply(questions);
  }, [questions, questionFilters]);

  return {
    filteredQuestions,
    questionFilters,
    setQuestionFilters,
  };
};

export const useQuestionFilter = <C extends QuestionFilterContextType>(
  context: React.Context<C>
) => {
  const { filteredQuestions, setQuestionFilters } = useContext(context);

  const applyQuestionFilters = (
    filterBuilder: FilterBuilder<Question> | null
  ) => {
    setQuestionFilters(filterBuilder);
  };

  return {
    applyQuestionFilters,
    filteredQuestions,
  };
};

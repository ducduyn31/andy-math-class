import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { FilterBuilder } from "@/components/admin/components/content-filter/shared/filter-builder";
import {
  UserFilterContextDefaultValue,
  useUserFilter,
  useUserFilterContext,
} from "@/hooks/use-filter-context/user";
import {
  FilterContextType,
  FilterType,
  UseFilterReturn,
} from "@/hooks/use-filter-context/types";
import {
  PaginationContextDefaultValue,
  usePagination,
  usePaginationContext,
} from "@/hooks/use-filter-context/pagination";
import {
  BookFilterContextDefaultValue,
  useBookFilter,
  useBookFilterContext,
} from "@/hooks/use-filter-context/book";
import {
  QuestionFilterContextDefaultValue,
  useQuestionFilter,
  useQuestionFilterContext,
} from "@/hooks/use-filter-context/question";

const FilterContext = React.createContext<FilterContextType>({
  ...UserFilterContextDefaultValue,
  ...BookFilterContextDefaultValue,
  ...QuestionFilterContextDefaultValue,
  ...PaginationContextDefaultValue,
});

export const FilterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { filteredUsers: filteredUsersWithoutPagination, setUserFilters } =
    useUserFilterContext();
  const { filteredBooks: filteredBooksWithoutPagination, setBookFilters } =
    useBookFilterContext();
  const {
    filteredQuestions: filterQuestionsWithoutPagination,
    setQuestionFilters,
  } = useQuestionFilterContext();
  const { page, setPage, pageSize } = usePaginationContext();

  return (
    <FilterContext.Provider
      value={{
        filteredUsers: filteredUsersWithoutPagination,
        filteredBooks: filteredBooksWithoutPagination,
        filteredQuestions: filterQuestionsWithoutPagination,
        setUserFilters,
        setBookFilters,
        setQuestionFilters,
        page,
        pageSize,
        setPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = <T extends FilterType>(
  type: T
): UseFilterReturn<T> => {
  const { applyUserFilters, filteredUsers } = useUserFilter(FilterContext);
  const { applyBookFilters, filteredBooks } = useBookFilter(FilterContext);
  const { applyQuestionFilters, filteredQuestions } =
    useQuestionFilter(FilterContext);
  const { page, pageSize, setPageNumber } = usePagination(FilterContext, type);

  const applyFilters = useCallback(
    (filters: FilterBuilder<any> | null) => {
      if (type === "user") {
        applyUserFilters(filters);
      } else if (type === "book") {
        applyBookFilters(filters);
      } else if (type === "question") {
        applyQuestionFilters(filters);
      }
    },
    [applyBookFilters, applyQuestionFilters, applyUserFilters, type]
  );

  const totalSize = useMemo(() => {
    if (type === "user") {
      return filteredUsers.length;
    } else if (type === "book") {
      return filteredBooks.length;
    } else if (type === "question") {
      return filteredQuestions.length;
    }
    return 0;
  }, [filteredBooks, filteredQuestions, filteredUsers, type]);

  const updatePagination = useCallback(
    <T,>(checkType: FilterType, filteredElements: T[]): T[] => {
      if (type !== checkType) return [];
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return filteredElements.slice(start, end);
    },
    [page, pageSize, type]
  );

  const filteredUsersWithPagination = useMemo(
    () => updatePagination("user", filteredUsers),
    [updatePagination, filteredUsers]
  );

  const filteredBooksWithPagination = useMemo(
    () => updatePagination("book", filteredBooks),
    [updatePagination, filteredBooks]
  );

  const filteredQuestionsWithPagination = useMemo(
    () => updatePagination("question", filteredQuestions),
    [updatePagination, filteredQuestions]
  );

  return {
    type,
    page,
    pageSize,
    totalSize,
    applyFilters,
    filteredUsers: filteredUsersWithPagination,
    filteredBooks: filteredBooksWithPagination,
    filteredQuestions: filteredQuestionsWithPagination,
    setPageNumber,
  } as unknown as UseFilterReturn<T>;
};

export default FilterContext;

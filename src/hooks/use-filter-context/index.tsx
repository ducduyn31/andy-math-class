import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
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
import {
  useGetLastFilterLazyQuery,
  useUpdateLastFilterMutation,
} from "@/gql/types";
import { useSession } from "next-auth/react";

const FilterContext = React.createContext<FilterContextType>({
  ...UserFilterContextDefaultValue,
  ...BookFilterContextDefaultValue,
  ...QuestionFilterContextDefaultValue,
  ...PaginationContextDefaultValue,
});

const useLoadSavedFilter = () => {
  const session = useSession();
  const [getLastFilters, { data }] = useGetLastFilterLazyQuery();

  useEffect(() => {
    const email = session.data?.user?.email;
    if (!email) return;
    getLastFilters({ variables: { email } });
  }, [getLastFilters, session]);

  return {
    userFilterState:
      data?.userResponse?.edges?.[0]?.node?.filter_statesCollection?.edges?.[0]
        ?.node?.state,
    bookFilterState:
      data?.bookResponse?.edges?.[0]?.node?.filter_statesCollection?.edges?.[0]
        ?.node?.state,
    questionFilterState:
      data?.questionResponse?.edges?.[0]?.node?.filter_statesCollection
        ?.edges?.[0]?.node?.state,
  };
};

export const FilterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    filteredUsers: filteredUsersWithoutPagination,
    userFilters,
    setUserFilters,
  } = useUserFilterContext();
  const {
    filteredBooks: filteredBooksWithoutPagination,
    bookFilters,
    setBookFilters,
  } = useBookFilterContext();
  const {
    filteredQuestions: filterQuestionsWithoutPagination,
    questionFilters,
    setQuestionFilters,
  } = useQuestionFilterContext();
  const { userFilterState, questionFilterState, bookFilterState } =
    useLoadSavedFilter();
  const { page, setPage, pageSize } = usePaginationContext();

  useEffect(() => {
    if (userFilterState) setUserFilters(new FilterBuilder(userFilterState));
    if (bookFilterState) setBookFilters(new FilterBuilder(bookFilterState));
    if (questionFilterState)
      setQuestionFilters(new FilterBuilder(questionFilterState));
  }, [
    userFilterState,
    questionFilterState,
    bookFilterState,
    setUserFilters,
    setBookFilters,
    setQuestionFilters,
  ]);

  return (
    <FilterContext.Provider
      value={{
        filteredUsers: filteredUsersWithoutPagination,
        filteredBooks: filteredBooksWithoutPagination,
        filteredQuestions: filterQuestionsWithoutPagination,
        setUserFilters,
        setBookFilters,
        setQuestionFilters,
        userFilters,
        bookFilters,
        questionFilters,
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
  const session = useSession();
  const { applyUserFilters, filteredUsers } = useUserFilter(FilterContext);
  const { applyBookFilters, filteredBooks } = useBookFilter(FilterContext);
  const { applyQuestionFilters, filteredQuestions } =
    useQuestionFilter(FilterContext);
  const { page, pageSize, setPageNumber } = usePagination(FilterContext, type);
  const { userFilters, questionFilters, bookFilters } =
    useContext(FilterContext);
  const [saveFilter] = useUpdateLastFilterMutation();

  const applyFilters = useCallback(
    (filters: FilterBuilder<any> | null) => {
      if (type === "user") {
        applyUserFilters(filters);
      } else if (type === "book") {
        applyBookFilters(filters);
      } else if (type === "question") {
        applyQuestionFilters(filters);
      }
      saveFilter({
        variables: {
          email: session.data?.user?.email || "",
          category: type,
          filter: filters?.serialize() || null,
        },
      });
    },
    [
      applyBookFilters,
      applyQuestionFilters,
      applyUserFilters,
      saveFilter,
      type,
      session,
    ]
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

  const currentFilter = useMemo(() => {
    if (type === "user") return userFilters;
    else if (type === "book") return bookFilters;
    else return questionFilters;
  }, [bookFilters, questionFilters, type, userFilters]);

  return {
    type,
    page,
    pageSize,
    totalSize,
    applyFilters,
    filteredUsers: filteredUsersWithPagination,
    filteredBooks: filteredBooksWithPagination,
    filteredQuestions: filteredQuestionsWithPagination,
    currentFilter,
    setPageNumber,
  } as unknown as UseFilterReturn<T>;
};

export default FilterContext;

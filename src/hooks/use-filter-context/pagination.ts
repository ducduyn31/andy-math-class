import { FilterType } from "@/hooks/use-filter-context/types";
import { useMap } from "react-use";
import React, { useCallback, useContext } from "react";

export type PaginationContextType = {
  pageSize: Record<FilterType, number>;
  page: Record<FilterType, number>;
  setPage: (filterType: FilterType, page: number) => void;
};

export type UsePaginationReturn = {
  pageSize: number;
  page: number;
  totalSize: number;
  setPageNumber: (page: number) => void;
};

export const PaginationContextDefaultValue: PaginationContextType = {
  pageSize: {
    user: 10,
    book: 5,
    question: 10,
  },
  page: {
    user: 1,
    book: 1,
    question: 1,
  },
  setPage: () => {},
};

export const usePaginationContext = () => {
  const [, { get: getPageSize }] = useMap({
    user: 10,
    book: 5,
    question: 10,
  });

  const [, { get: getPage, set: setPage }] = useMap({
    user: 1,
    book: 1,
    question: 1,
  });

  return {
    pageSize: {
      user: getPageSize("user"),
      book: getPageSize("book"),
      question: getPageSize("question"),
    },
    page: {
      user: getPage("user"),
      book: getPage("book"),
      question: getPage("question"),
    },
    setPage,
  };
};

export const usePagination = <C extends PaginationContextType>(
  context: React.Context<C>,
  type: FilterType
) => {
  const { pageSize, setPage, page } = useContext(context);

  const setPageNumber = useCallback(
    (page: number) => {
      setPage(type, page);
    },
    [setPage, type]
  );

  return {
    page: page[type],
    pageSize: pageSize[type],
    setPageNumber,
  };
};

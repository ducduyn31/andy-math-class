import { Book } from "@/models";
import { FilterBuilder } from "@/components/admin/components/content-filter/shared/filter-builder";
import { useAdminContext } from "@/hooks/use-admin-context";
import React, { useContext, useMemo, useState } from "react";

export type BookFilterContextType = {
  filteredBooks: Book[];
  setBookFilters: (filters: FilterBuilder<Book> | null) => void;
};

export interface BookFilterReturn {
  type: "book";
  filteredBooks: Book[];
  applyFilters: (filterBuilder: FilterBuilder<Book> | null) => void;
}

export const BookFilterContextDefaultValue: BookFilterContextType = {
  filteredBooks: [],
  setBookFilters: () => {},
};

export const useBookFilterContext = (): BookFilterContextType => {
  const { books } = useAdminContext();
  const [bookFilters, setBookFilters] = useState<FilterBuilder<Book> | null>(
    null
  );

  const filteredBooks = useMemo(() => {
    if (!bookFilters) return books;
    return bookFilters.apply(books);
  }, [books, bookFilters]);

  return {
    filteredBooks,
    setBookFilters,
  };
};

export const useBookFilter = <C extends BookFilterContextType>(
  context: React.Context<C>
) => {
  const { filteredBooks, setBookFilters } = useContext(context);

  const applyBookFilters = (filterBuilder: FilterBuilder<Book> | null) => {
    setBookFilters(filterBuilder);
  };

  return {
    applyBookFilters,
    filteredBooks,
  };
};

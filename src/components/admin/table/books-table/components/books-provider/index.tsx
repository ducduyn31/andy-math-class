import React, { PropsWithChildren } from "react";
import { Book } from "@/models";
import { useGetAllBooks } from "@/hooks/use-get-all-books";
import { Maybe } from "@/gql/types";

interface SupportedFilter {
  name?: Maybe<string>;
}

type BooksProviderType = {
  books: Book[];
  externalLoadComplete?: boolean;
  externalLoading?: boolean;
  loadFromExternalSource?: () => Promise<void>;
  filterBooks?: (args?: SupportedFilter) => void;
};

const defaultContext: BooksProviderType = {
  books: [],
  externalLoadComplete: true,
  externalLoading: false,
};

const BooksContext = React.createContext<BooksProviderType>(defaultContext);

interface Props extends PropsWithChildren {}

export const BooksProvider: React.FC<Props> = ({ children }) => {
  const { books, hasNextPage, loading, fetchMore, filterBooks } =
    useGetAllBooks();

  return (
    <BooksContext.Provider
      value={{
        books,
        externalLoadComplete: !hasNextPage,
        externalLoading: loading,
        loadFromExternalSource: fetchMore,
        filterBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => React.useContext(BooksContext);

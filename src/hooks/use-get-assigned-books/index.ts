import { mapBooksFromGetAssignedBooks } from "@/models";
import { useGetAssignedBooksQuery } from "@/gql/types";
import { useMemo } from "react";

export const useGetAssignedBooks = () => {
  const { data, loading } = useGetAssignedBooksQuery();

  const books = useMemo(() => {
    if (!data?.booksCollection?.edges?.length) return [];

    return mapBooksFromGetAssignedBooks(data);
  }, [data]);

  return {
    books,
    loading,
  };
};

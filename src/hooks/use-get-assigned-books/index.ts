import { Book } from "@/models";
import { bookDatabase } from "@/components/admin/table/books-table";

export const useGetAssignedBooks = (): Book[] => {
  return bookDatabase;
};

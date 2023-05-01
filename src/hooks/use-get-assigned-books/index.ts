import { Book } from "@/models";
import { bookDatabase } from "@/components/admin/Table/AdminBookTable";

export const useGetAssignedBooks = (): Book[] => {
  return bookDatabase;
};

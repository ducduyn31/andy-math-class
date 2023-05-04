import { AdminUserRowProps } from "@/components/admin/table/users-table/components/user-row";

export const rowMatchEmail = (user: AdminUserRowProps, email: string) => {
  if (email.length == 0) return true;
  return user.email.toLowerCase().includes(email.toLowerCase());
};

export const rowMatchBook = (user: AdminUserRowProps, book: string) => {
  if (book == "any") return true;
  if (book == "notAssigned") return user.assignedBooks.length == 0;
  return user.assignedBooks.some((assignedBook) =>
    assignedBook.name.toLowerCase().includes(book.toLowerCase())
  );
};

export const rowMatchStatus = (user: AdminUserRowProps, status: string) => {
  if (status == "any") return true;
  return user.enabled.toString() == status.toLowerCase();
};

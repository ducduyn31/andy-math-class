import { User } from "@/models";
import { assureNumber } from "@/helpers/number";

export const rowMatchEmail = (user: User, email: string) => {
  if (email.length == 0) return true;
  return user.email.toLowerCase().includes(email.toLowerCase());
};

export const rowMatchBook = (user: User, book: string) => {
  if (book == "any") return true;
  if (book == "notAssigned")
    return assureNumber(user.assignedBooks?.length) === 0;
  return !!user.assignedBooks?.some((assignedBook) =>
    assignedBook.name.toLowerCase().includes(book.toLowerCase())
  );
};

export const rowMatchStatus = (user: User, status: string) => {
  if (status == "any") return true;
  return user.isEnabled.toString() == status.toLowerCase();
};

import { Book } from "@/models";
import {
  SelectOption,
  SelectOptions,
} from "@/components/admin/components/content-filter/shared/select-filter-field";

export const mapBooksToOptions = (books: Book[]): SelectOption[] => {
  const bookOptions = books.map((book) => ({
    value: book.id,
    label: book.name,
  }));
  return [SelectOptions.ANY_DEFAULT, SelectOptions.DISABLED, ...bookOptions];
};

export const getUserStatusOptions = (): SelectOption[] => [
  SelectOptions.ANY_DEFAULT,
  SelectOptions.DISABLED,
  { value: "true", label: "Enabled" },
  { value: "false", label: "Disabled" },
];

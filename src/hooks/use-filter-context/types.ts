import {
  UserFilterContextType,
  UserFilterReturn,
} from "@/hooks/use-filter-context/user";
import {
  PaginationContextType,
  UsePaginationReturn,
} from "@/hooks/use-filter-context/pagination";
import {
  BookFilterContextType,
  BookFilterReturn,
} from "@/hooks/use-filter-context/book";
import {
  QuestionFilterContextType,
  QuestionFilterReturn,
} from "@/hooks/use-filter-context/question";

export type FilterType = "user" | "book" | "question";
export type UseFilterReturn<T extends FilterType> = (T extends "user"
  ? UserFilterReturn
  : T extends "book"
  ? BookFilterReturn
  : QuestionFilterReturn) &
  UsePaginationReturn;

type CurrentFilterMatch = {
  currentMatch: Record<FilterType, Record<string, unknown>>;
};

export type FilterContextType = UserFilterContextType &
  BookFilterContextType &
  QuestionFilterContextType &
  CurrentFilterMatch &
  PaginationContextType;

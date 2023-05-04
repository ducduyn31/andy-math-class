import React from "react";
import { useGetAllForAdminQuery } from "@/gql/types";
import { assureNumber } from "@/helpers/number";
import { useGetAllUsers } from "../use-get-all-users";
import { User, mapUser, Book, mapBook, Question, mapQuestion } from "@/models";

export type AdminContextType = {
  totalUsers: number;
  totalBooks: number;
  totalQuestions: number;
  users: User[];
  books: Book[];
  questions: Question[];
};

const AdminContext = React.createContext<AdminContextType>({
  totalUsers: 0,
  totalBooks: 0,
  totalQuestions: 0,
  users: [],
  books: [],
  questions: [],
});

export const AdminProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data: usersData } = useGetAllUsers();
  const { data: booksAndQuestionsData } = useGetAllForAdminQuery();
  return (
    <AdminContext.Provider
      value={{
        totalUsers: assureNumber(usersData?.length),
        totalBooks: assureNumber(
          booksAndQuestionsData?.booksCollection?.edges?.length
        ),
        totalQuestions: assureNumber(
          booksAndQuestionsData?.questionsCollection?.edges?.length
        ),
        users: usersData?.map(mapUser) || [],
        books:
          booksAndQuestionsData?.booksCollection?.edges?.map(mapBook) || [],
        questions:
          booksAndQuestionsData?.questionsCollection?.edges?.map(mapQuestion) ||
          [],
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => React.useContext(AdminContext);

export default AdminContext;

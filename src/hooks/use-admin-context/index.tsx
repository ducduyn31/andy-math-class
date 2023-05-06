import React from "react";
import { useGetAllForAdminQuery } from "@/gql/types";
import { assureNumber } from "@/helpers/number";
import { useGetAllUsers } from "../use-get-all-users";
import {
  Book,
  mapBooksFromGetAdminStat,
  mapQuestionFromGetAdminStat,
  mapUser,
  Question,
  User,
} from "@/models";

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
        books: booksAndQuestionsData
          ? mapBooksFromGetAdminStat(booksAndQuestionsData)
          : [],
        questions: booksAndQuestionsData
          ? mapQuestionFromGetAdminStat(booksAndQuestionsData)
          : [],
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => React.useContext(AdminContext);

export default AdminContext;

import React, { useMemo } from "react";
import {
  Book,
  mapBooksFromQuery,
  mapQuestionsFromQuery,
  mapUserFromQuery,
  Question,
  User,
} from "@/models";
import { useFetchUsersRecursive } from "@/hooks/use-admin-context/fetch-users-recursive";
import { useFetchBooksRecursive } from "@/hooks/use-admin-context/fetch-books-recursive";
import { useFetchQuestionsRecursive } from "@/hooks/use-admin-context/fetch-questions-recursive";

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

const combineReferences = ({
  originUsers,
  originBooks,
  originQuestions,
}: {
  originUsers: User[];
  originBooks: Book[];
  originQuestions: Question[];
}): {
  users: User[];
  books: Book[];
  questions: Question[];
} => {
  const usersMap = originUsers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {} as Record<string, User>);
  const booksMap = originBooks.reduce((acc, book) => {
    acc[book.id] = book;
    return acc;
  }, {} as Record<string, Book>);
  const chaptersMap = originBooks.reduce((acc, book) => {
    if (!book.chapters?.length) return acc;
    book.chapters.forEach((chapter) => {
      acc[chapter.id] = chapter;
    });
    return acc;
  }, {} as Record<string, Book["chapters"][0]>);
  const questionsMap = originQuestions.reduce((acc, question) => {
    if (!question.id) return acc;
    acc[question.id] = question;
    return acc;
  }, {} as Record<string, Question>);

  // Update assigned books references in users
  Object.values(usersMap).forEach((user) => {
    if (!user.assignedBooks?.length) return;
    user.assignedBooks = user.assignedBooks.map(
      (assignedBook) => booksMap[assignedBook.id]
    );
  });

  // Update book and chapter references in questions
  Object.values(questionsMap).forEach((question) => {
    if (question.book) {
      question.book = booksMap[question.book.id];
    }
    if (question.chapter) {
      question.chapter = chaptersMap[question.chapter.id];
    }
  });

  return {
    users: originUsers,
    books: originBooks,
    questions: originQuestions,
  };
};

export const AdminProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data: userData, completed: userFetchCompleted } =
    useFetchUsersRecursive();
  const { data: booksData, completed: bookFetchCompleted } =
    useFetchBooksRecursive();
  const { data: questionsData, completed: questionFetchCompleted } =
    useFetchQuestionsRecursive();

  const { users, books, questions } = useMemo(() => {
    const preReferencedUsers = mapUserFromQuery(userData);
    const preReferencedBooks = mapBooksFromQuery(booksData);
    const preReferencedQuestions = mapQuestionsFromQuery(questionsData);

    if (!userFetchCompleted || !bookFetchCompleted || !questionFetchCompleted) {
      return {
        users: [],
        books: [],
        questions: [],
      };
    }

    return combineReferences({
      originUsers: preReferencedUsers,
      originBooks: preReferencedBooks,
      originQuestions: preReferencedQuestions,
    });
  }, [
    bookFetchCompleted,
    booksData,
    questionFetchCompleted,
    questionsData,
    userData,
    userFetchCompleted,
  ]);

  return (
    <AdminContext.Provider
      value={{
        totalUsers: users.length,
        totalBooks: books.length,
        totalQuestions: questions.length,
        users,
        books,
        questions,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => React.useContext(AdminContext);

export default AdminContext;

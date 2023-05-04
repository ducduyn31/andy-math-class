import { AdminStat } from "@/components/admin/components/admin-stat";
import { AdminMenu } from "@/components/admin/components/admin-nav-menu";
import { AdminUserRowProps } from "@/components/admin/table/users-table/components/user-row";
import React, { useState } from "react";
import BookModificationModal from "@/components/admin/BookModificationModal";
import { Toaster } from "react-hot-toast";
import { AdminFilter } from "@/components/admin/components/content-filter";
import QuestionModificationModal from "@/components/admin/QuestionModificationModal";
import { Book, Question } from "@/models";
import { Navbar } from "@/components/navbar";
import { AdminProvider } from "@/hooks/use-admin-context";

interface SharedContext {
  setBookModification: (...args: any[]) => any;
  setQuestionModification: (...args: any[]) => any;
  currentMenu: number;
  filteredInput: {
    filteredUsers: {
      isFiltering: boolean;
      email: string;
      book: string;
      enabled: string;
    };
    filteredBooks: {
      isFiltering: boolean;
      name: string;
    };
    filteredQuestion: {
      isFiltering: boolean;
      book: string;
      chapter: string;
    };
  };
}

const filteredInputInitial: SharedContext["filteredInput"] = {
  filteredUsers: {
    isFiltering: false,
    email: "",
    book: "any",
    enabled: "any",
  },
  filteredBooks: {
    isFiltering: false,
    name: "",
  },
  filteredQuestion: {
    isFiltering: false,
    book: "any",
    chapter: "any",
  },
};
// @ts-ignore
const AdminLayout = ({ children }) => {
  const [, setUserModification] = useState<AdminUserRowProps>();
  const [currentMenu] = useState<number>(0);
  const [bookModification, setBookModification] = useState<Book>();
  const [questionModification, setQuestionModification] = useState<Question>();
  const [filteredInput, setFilteredInput] =
    useState<SharedContext["filteredInput"]>(filteredInputInitial);

  return (
    <AdminProvider>
      <section>
        <Navbar isAdmin={true} />
        <div className="container mx-auto mt-5 h-fullpage">
          <AdminStat />
          <div className={"md:grid mt-2 md:grid-cols-12 gap-3"}>
            <div className={"md:col-span-3"}>
              <AdminMenu />
              <AdminFilter
                key={currentMenu}
                setFilterInput={setFilteredInput}
                filteredInput={filteredInput}
              />
            </div>
            <div className={"md:col-span-9"}>
              {React.cloneElement(children, {
                currentMenu,
                setUserModification,
                setBookModification,
                setQuestionModification,
                filteredInput,
              })}
            </div>
          </div>
        </div>
        {bookModification && (
          <BookModificationModal
            book={bookModification}
            key={bookModification.name}
          />
        )}
        {questionModification && (
          <QuestionModificationModal
            key={questionModification.id}
            question={questionModification}
          />
        )}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: "99px",
            },
          }}
        />
      </section>
    </AdminProvider>
  );
};

export default AdminLayout;
export { filteredInputInitial };

export type { SharedContext };

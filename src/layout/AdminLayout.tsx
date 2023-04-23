import Navbar from "@/components/Navbar";
import { AdminStat } from "@/components/admin/AdminStat";
import AdminMenu from "@/components/admin/AdminMenu";
import UserModificationModal from "@/components/admin/UserModificationModal";
import { AdminUserRowProps } from "@/components/admin/Table/AdminUserRow";
import React, { useState } from "react";
import AdminFilter from "@/components/admin/Table/AdminFilterUserPage";
import BookModificationModal from "@/components/admin/BookModificationModal";
import { Book } from "@/components/admin/Table/AdminBookTable";
import { resolveValue, Toaster } from "react-hot-toast";
import theme from "tailwindcss/defaultTheme";

interface SharedContext {
  setUserModification: (...args: any[]) => any;
  setBookModification: (...args: any[]) => any;
  currentMenu: number;
  filteredInput: {
    filteredUsers: {
      isFiltering: boolean;
      email: string;
      book: string;
      enabled: string;
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
};
// @ts-ignore
const AdminLayout = ({ children }) => {
  const [userModification, setUserModification] = useState<AdminUserRowProps>();
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const [bookModification, setBookModification] = useState<Book>();
  const [filteredInput, setFilteredInput] =
    useState<SharedContext["filteredInput"]>(filteredInputInitial);

  return (
    <section>
      <Navbar isAdmin={true} />
      <div className="container mx-auto mt-5 h-fullpage">
        <AdminStat />
        <div className={"md:grid mt-2 md:grid-cols-12 gap-3"}>
          <div className={"md:col-span-3"}>
            <AdminMenu setCurrentMenu={setCurrentMenu} />
            <AdminFilter setFilteredInput={setFilteredInput} />
          </div>
          <div className={"md:col-span-9"}>
            {React.cloneElement(children, {
              currentMenu,
              setUserModification,
              setBookModification,
              filteredInput,
            })}
          </div>
        </div>
      </div>
      {userModification && (
        <UserModificationModal
          key={userModification.email}
          user={userModification}
        />
      )}
      {bookModification && <BookModificationModal book={bookModification} />}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "99px",
          },
        }}
      />
    </section>
  );
};

export default AdminLayout;
export { filteredInputInitial };

export type { SharedContext };

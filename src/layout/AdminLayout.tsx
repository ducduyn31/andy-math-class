import { AdminStat } from "@/components/admin/components/admin-stat";
import { AdminMenu } from "@/components/admin/components/admin-nav-menu";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AdminFilter } from "@/components/admin/components/content-filter";
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
  const [currentMenu] = useState<number>(0);
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
                filteredInput,
              })}
            </div>
          </div>
        </div>
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

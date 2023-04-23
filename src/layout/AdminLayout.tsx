import Navbar from "@/components/Navbar";
import { AdminStat } from "@/components/admin/AdminStat";
import AdminMenu from "@/components/admin/AdminMenu";
import UserModificationModal from "@/components/admin/UserModificationModal";
import { AdminUserRowProps } from "@/components/admin/Table/AdminUserRow";
import React, { useState } from "react";
import userModificationModal from "@/components/admin/UserModificationModal";
import AdminFilter from "@/components/admin/Table/AdminFilterUserPage";

interface SharedContext {
  setUserModification: (...args: any[]) => any;
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
              setUserModification,
              currentMenu,
              filteredInput,
            })}
          </div>
        </div>
      </div>
      {userModification && (
        <UserModificationModal
          key={userModification.email}
          firstName={userModification.firstName}
          lastName={userModification.lastName}
          email={userModification.email}
          enabled={userModification.enabled}
          assignedBooks={userModification.assignedBooks}
        />
      )}
    </section>
  );
};

export default AdminLayout;
export { filteredInputInitial };

export type { SharedContext };

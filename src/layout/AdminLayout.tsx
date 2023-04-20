import Navbar from "@/components/Navbar";
import { AdminStat } from "@/components/admin/AdminStat";
import AdminMenu from "@/components/admin/AdminMenu";
import UserModificationModal from "@/components/admin/UserModificationModal";
import { AdminUserRowProps } from "@/components/admin/Table/AdminUserRow";
import React, { useState } from "react";
import userModificationModal from "@/components/admin/UserModificationModal";

interface SupportFunction {
  setUserModification: (...args: any[]) => any;
}

// @ts-ignore
const AdminLayout = ({ children }) => {
  const [userModification, setUserModification] = useState<AdminUserRowProps>();

  return (
    <section>
      <Navbar isAdmin={true} />
      <div className="container mx-auto mt-5">
        <AdminStat />
        <div className={"md:grid mt-2 md:grid-cols-12 gap-3"}>
          <div className={"md:col-span-3"}>
            <AdminMenu />
          </div>
          <div className={"md:col-span-9"}>
            {React.cloneElement(children, { setUserModification })}
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

export type { SupportFunction };

import { AdminStat } from "@/components/admin/components/admin-stat";
import React, { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/navbar";

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section>
      <Navbar />
      <div className="container mx-auto py-5 h-full">
        <AdminStat />
        <div className="mt-2">
          {!!children && React.cloneElement(children as React.ReactElement)}
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
  );
};

export default AdminLayout;

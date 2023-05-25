import { AdminStat } from "@/components/admin/components/admin-stat";
import { AdminMenu } from "@/components/admin/components/admin-nav-menu";
import React, { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { AdminFilter } from "@/components/admin/components/content-filter";
import { Navbar } from "@/components/navbar";
import { AdminProvider } from "@/hooks/use-admin-context";
import { FilterProvider } from "@/hooks/use-filter-context";

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AdminProvider>
      <FilterProvider>
        <section>
          <Navbar isAdmin={true} />
          <div className="container mx-auto mt-5 h-fullpage">
            <AdminStat />
            <div className={"md:grid mt-2 md:grid-cols-12 gap-3"}>
              <div className={"md:col-span-3"}>
                <AdminMenu />
                <AdminFilter />
              </div>
              <div className="md:col-span-9">
                {!!children &&
                  React.cloneElement(children as React.ReactElement)}
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
      </FilterProvider>
    </AdminProvider>
  );
};

export default AdminLayout;

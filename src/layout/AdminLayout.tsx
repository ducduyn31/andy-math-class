import { AdminStat } from "@/components/admin/components/admin-stat";
import React, { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/navbar";
import { useSidebarToggle } from "@/components/navbar/components/sidebar-toggle";
import { SideNavigation } from "@/components/admin/components/sided-navigation";

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isToggled, setToggle] = useSidebarToggle();

  return (
    <section>
      <div className="fixed w-full z-50 top-0">
        <Navbar />
      </div>
      <div className="mt-16 drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isToggled}
        />
        <div className="drawer-side pt-16 z-40">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setToggle(false)}
          />
          <SideNavigation />
        </div>
        <div className="h-full container mx-auto py-5 drawer-content">
          <AdminStat />
          <div className="mt-2">
            {!!children && React.cloneElement(children as React.ReactElement)}
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
  );
};

export default AdminLayout;

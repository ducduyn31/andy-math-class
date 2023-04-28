import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import React from "react";

// @ts-ignore
const Layout = ({ children }) => {
  return (
    <>
      <section>
        <Navbar />
        <div className={"container mx-auto mt-5 h-fullpage"}>{children}</div>
      </section>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "99px",
          },
        }}
      />
    </>
  );
};

export default Layout;

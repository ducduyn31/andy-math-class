import { Toaster } from "react-hot-toast";
import React from "react";
import { BookProvider } from "@/hooks/use-book-context";
import { Navbar } from "@/components/navbar";

// @ts-ignore
const Layout = ({ children }) => {
  return (
    <BookProvider>
      <section>
        <Navbar />
        <div className="h-fullpage">{children}</div>
      </section>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "99px",
          },
        }}
      />
    </BookProvider>
  );
};

export default Layout;

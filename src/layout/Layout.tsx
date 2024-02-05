import { Toaster } from "react-hot-toast";
import React, { PropsWithChildren } from "react";
import { BookProvider } from "@/hooks/use-book-context";
import { Navbar } from "@/components/navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <BookProvider>
      <section>
        <div className="fixed w-full z-50 top-0">
          <Navbar />
        </div>
        <div className="h-screen mt-16 bg-base-200">{children}</div>
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

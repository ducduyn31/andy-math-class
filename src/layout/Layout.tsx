import { Toaster } from "react-hot-toast";
import React, { PropsWithChildren } from "react";
import { BookProvider } from "@/hooks/use-book-context";
import { Navbar } from "@/components/navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
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

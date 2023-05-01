import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import React from "react";
import { SidedQuestionFilter } from "@/components/question-filter";
import { BookProvider } from "@/hooks/use-book-context";

// @ts-ignore
const Layout = ({ children }) => {
  return (
    <BookProvider>
      <section>
        <Navbar />
        <div className="grid grid-cols-5 h-fullpage">
          <SidedQuestionFilter />
          <div className={"col-span-4 container mx-auto mt-5"}>{children}</div>
        </div>
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

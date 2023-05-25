import { FilterUser } from "@/components/admin/components/content-filter/components/user-filter";
import { FilterBook } from "@/components/admin/components/content-filter/components/book-filter";
import { FilterQuestion } from "@/components/admin/components/content-filter/components/question-filter";
import { useRouter } from "next/router";
import { matchPath } from "@/helpers/path";
import React from "react";

export const AdminFilter: React.FC = () => {
  const router = useRouter();
  const path = router.asPath;

  if (matchPath(path, "/admin/users")) {
    return <FilterUser />;
  }

  if (matchPath(path, "/admin/books")) {
    return <FilterBook />;
  }

  if (matchPath(path, "/admin/questions")) {
    return <FilterQuestion />;
  }
  return null;
};

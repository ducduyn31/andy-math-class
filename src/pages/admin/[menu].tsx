import AdminLayout from "@/layout/AdminLayout";
import { ReactElement } from "react";
import { AdminBookTable } from "@/components/admin/table/books-table";
import { AdminQuestionTable } from "@/components/admin/table/questions-table";
import { useRouter } from "next/router";
import { matchPath } from "@/helpers/path";
import { AdminUserTable } from "@/components/admin/table/users-table";

const AdminPage = () => {
  const router = useRouter();
  const path = router.asPath;

  if (matchPath(path, "/admin/users")) {
    return <AdminUserTable />;
  }
  if (matchPath(path, "/admin/books")) {
    return <AdminBookTable />;
  }
  if (matchPath(path, "/admin/questions")) {
    return <AdminQuestionTable />;
  }
  return <>Unimplemented</>;
};

AdminPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AdminPage;

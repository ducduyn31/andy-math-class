import AdminLayout, { SharedContext } from "@/layout/AdminLayout";
import { ReactElement, ReactPropTypes } from "react";
import { AdminBookTable } from "@/components/admin/table/books-table";
import { AdminQuestionTable } from "@/components/admin/table/questions-table";
import { useRouter } from "next/router";
import { matchPath } from "@/helpers/path";
import { AdminUserTable } from "@/components/admin/table/users-table";

const AdminPage = (props: ReactPropTypes & SharedContext) => {
  const router = useRouter();
  const path = router.asPath;

  if (matchPath(path, "/admin/users")) {
    return <AdminUserTable filteredInput={props.filteredInput} />;
  }
  if (matchPath(path, "/admin/books")) {
    return (
      <AdminBookTable
        setBookModification={props.setBookModification}
        filteredInput={props.filteredInput}
      />
    );
  }
  if (matchPath(path, "/admin/questions")) {
    return (
      <AdminQuestionTable
        setQuestionModification={props.setQuestionModification}
        filteredInput={props.filteredInput}
      />
    );
  }
  return <>Unimplemented</>;
};

AdminPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AdminPage;

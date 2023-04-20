import AdminLayout from "@/layout/AdminLayout";
import { ReactElement, ReactPropTypes } from "react";
import AdminUserTable from "@/components/admin/Table/AdminUserTable";

const AdminPage = (props: ReactPropTypes) => {
  return <AdminUserTable {...props} />;
};

AdminPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AdminPage;

import AdminLayout, { SharedContext } from "@/layout/AdminLayout";
import { ReactElement, ReactPropTypes } from "react";
import AdminUserTable from "@/components/admin/Table/AdminUserTable";

const AdminPage = (props: ReactPropTypes & SharedContext) => {
  const { currentMenu } = props;
  switch (currentMenu) {
    case 0:
      return <AdminUserTable {...props} />;
    default:
      return <>Unimplemented</>;
  }
};

AdminPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AdminPage;

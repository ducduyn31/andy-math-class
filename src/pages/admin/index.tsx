import AdminLayout, { SharedContext } from "@/layout/AdminLayout";
import { ReactElement, ReactPropTypes } from "react";
import AdminUserTable from "@/components/admin/Table/AdminUserTable";
import AdminBookTable from "@/components/admin/Table/AdminBookTable";

const AdminPage = (props: ReactPropTypes & SharedContext) => {
  const { currentMenu } = props;
  switch (currentMenu) {
    case 0:
      return (
        <AdminUserTable
          setUserModification={props.setUserModification}
          filteredInput={props.filteredInput}
        />
      );
    case 1:
      return (
        <AdminBookTable
          setBookModification={props.setBookModification}
          filteredInput={props.filteredInput}
        />
      );
    default:
      return <>Unimplemented</>;
  }
};

AdminPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AdminPage;

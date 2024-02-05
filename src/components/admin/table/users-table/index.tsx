import { UsersProvider } from "@/components/admin/table/users-table/components/users-provider";
import { UsersTable } from "@/components/admin/table/users-table/components/users-table";
import { UsersFilter } from "@/components/admin/table/users-table/components/users-filter";

export const AdminUserTable = () => {
  return (
    <UsersProvider>
      <div className="flex flex-col gap-y-3">
        <UsersFilter />
        <UsersTable />
      </div>
    </UsersProvider>
  );
};

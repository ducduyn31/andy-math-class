import { AdminUserRow } from "@/components/admin/table/users-table/components/user-row";
import { useFilter } from "@/hooks/use-filter-context";
import { AdminContentPageNav } from "@/components/admin/components/content-page-nav";

export const AdminUserTable = () => {
  const { filteredUsers } = useFilter("user");

  return (
    <>
      <div className="card bg-base-100 drop-shadow-xl mt-5 md:mt-0">
        <div className={"overflow-x-auto"}>
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Assigned Books</th>
                <th>Actions</th>
                <th>Enabled</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <AdminUserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={"flex sm:flex-row flex-col sm:justify-center mt-5"}>
        <div className="btn-group sm:justify-start justify-center">
          <AdminContentPageNav filterType="user" />
        </div>
      </div>
    </>
  );
};

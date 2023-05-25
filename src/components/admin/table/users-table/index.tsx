import { AdminUserRow } from "@/components/admin/table/users-table/components/user-row";
import { useFilter } from "@/hooks/use-filter-context";

export const AdminUserTable = () => {
  const { filteredUsers, page, pageSize, totalSize, setPageNumber } =
    useFilter("user");

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
          {[...Array(Math.ceil(totalSize / pageSize))].map((_, i) => (
            <input
              key={i}
              type="radio"
              name="options"
              data-title={i + 1}
              className="btn flex-grow"
              checked={i + 1 === page}
              onChange={() => setPageNumber(i + 1)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

import { AdminUserRow } from "@/components/admin/table/users-table/components/user-row";
import { useCallback, useEffect, useState } from "react";
import { SharedContext } from "@/layout/AdminLayout";
import { useAdminContext } from "@/hooks/use-admin-context";
import {
  rowMatchBook,
  rowMatchEmail,
  rowMatchStatus,
} from "@/helpers/admin/users/filter";
import { User } from "@/models";

const itemPerPage = 10;
export const AdminUserTable = ({
  filteredInput,
}: {
  filteredInput: SharedContext["filteredInput"];
}) => {
  const [page, setPage] = useState(0);
  const [dataset, setDataset] = useState<User[]>([]);
  const { filteredUsers } = filteredInput;
  const { users, totalUsers } = useAdminContext();

  const updatePaginationItem = useCallback(() => {
    const start = page * itemPerPage;
    setDataset(users.slice(start, start + itemPerPage));
  }, [users, page]);

  useEffect(() => {
    updatePaginationItem();
  }, [page, updatePaginationItem]);

  useEffect(() => {
    if (filteredUsers.isFiltering) {
      setDataset(
        users.filter(
          (userRow) =>
            rowMatchEmail(userRow, filteredUsers.email) &&
            rowMatchBook(userRow, filteredUsers.book) &&
            rowMatchStatus(userRow, filteredUsers.enabled)
        )
      );
    } else {
      updatePaginationItem();
    }
  }, [users, filteredUsers, updatePaginationItem]);

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
              {dataset.map((user) => (
                <AdminUserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={"flex sm:flex-row flex-col sm:justify-center mt-5"}>
        <div className="btn-group sm:justify-start justify-center">
          {[...Array(Math.ceil(totalUsers / itemPerPage))].map((_, i) => (
            <input
              key={i}
              type={"radio"}
              name={"options"}
              data-title={i + 1}
              className={`btn ${
                filteredUsers.isFiltering ? "btn-disabled" : ""
              } flex-grow`}
              defaultChecked={i == page}
              onChange={() => setPage(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

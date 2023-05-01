import { faker } from "@faker-js/faker";
import AdminUserRow, {
  AdminUserRowProps,
} from "@/components/admin/Table/AdminUserRow";
import { useCallback, useEffect, useState } from "react";
import { bookDatabase } from "@/components/admin/Table/AdminBookTable";
import { SharedContext } from "@/layout/AdminLayout";

faker.seed(123);

const isCorrectEmail = (user: AdminUserRowProps, email: string) => {
  if (email.length == 0) return true;
  return user.email.toLowerCase().includes(email.toLowerCase());
};

const isCorrectBook = (user: AdminUserRowProps, book: string) => {
  if (book == "any") return true;
  if (book == "notAssigned") return user.assignedBooks.length == 0;
  return user.assignedBooks.some((assignedBook) =>
    assignedBook.name.toLowerCase().includes(book.toLowerCase())
  );
};

const isCorrectStatus = (user: AdminUserRowProps, status: string) => {
  if (status == "any") return true;
  return user.enabled.toString() == status.toLowerCase();
};
const userDatabase = [...Array(87).keys()].map((): AdminUserRowProps => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    assignedBooks: [
      ...Array(
        faker.datatype.number({ min: 0, max: bookDatabase.length })
      ).keys(),
    ].map((_, i) => bookDatabase[i]),
    enabled: faker.datatype.boolean(),
  };
});

const itemPerPage = 10;
const AdminUserTable = ({
  filteredInput,
  setUserModification,
}: {
  filteredInput: SharedContext["filteredInput"];
  setUserModification: SharedContext["setUserModification"];
}) => {
  const [page, setPage] = useState(0);
  const [dataset, setDataset] = useState<AdminUserRowProps[]>([]);
  const { filteredUsers } = filteredInput;

  const updatePaginationItem = useCallback(() => {
    const start = page * itemPerPage;
    setDataset(userDatabase.slice(start, start + itemPerPage));
  }, [page]);

  useEffect(() => {
    updatePaginationItem();
  }, [page, updatePaginationItem]);

  useEffect(() => {
    if (filteredUsers.isFiltering) {
      setDataset(
        userDatabase.filter(
          (user) =>
            isCorrectEmail(user, filteredUsers.email) &&
            isCorrectBook(user, filteredUsers.book) &&
            isCorrectStatus(user, filteredUsers.enabled)
        )
      );
    } else {
      updatePaginationItem();
    }
  }, [filteredUsers, updatePaginationItem]);

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
              {dataset.map((data) => (
                <AdminUserRow
                  key={data.email}
                  firstName={data.firstName}
                  lastName={data.lastName}
                  email={data.email}
                  assignedBooks={data.assignedBooks}
                  enabled={data.enabled}
                  setUserModification={setUserModification}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={"flex sm:flex-row flex-col sm:justify-center mt-5"}>
        <div className="btn-group sm:justify-start justify-center">
          {[...Array(Math.ceil(userDatabase.length / itemPerPage))].map(
            (_, i) => (
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
            )
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUserTable;

export { userDatabase };

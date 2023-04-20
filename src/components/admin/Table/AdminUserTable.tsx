import { faker } from "@faker-js/faker";
import AdminUserRow, {
  AdminUserRowProps,
} from "@/components/admin/Table/AdminUserRow";
import { ReactPropTypes, useEffect, useState } from "react";
import { bookDatabase } from "@/components/admin/Table/AdminBookTable";
import { SupportFunction } from "@/layout/AdminLayout";

faker.seed(123);
const userDatabase = [...Array(100).keys()].map((): AdminUserRowProps => {
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
const AdminUserTable = (props: ReactPropTypes & SupportFunction) => {
  const [page, setPage] = useState(0);
  const [dataset, setDataset] = useState<AdminUserRowProps[]>([]);

  useEffect(() => {
    const start = page * itemPerPage;
    setDataset(userDatabase.slice(start, start + itemPerPage));
  }, [page]);

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
              {dataset.map((data, index) => (
                <AdminUserRow
                  key={index}
                  firstName={data.firstName}
                  lastName={data.lastName}
                  email={data.email}
                  assignedBooks={data.assignedBooks}
                  enabled={data.enabled}
                  {...props}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={"flex justify-center mt-5"}>
        <div className="btn-group">
          {[...Array(100 / itemPerPage)].map((_, i) => (
            <input
              key={i}
              type={"radio"}
              name={"options"}
              data-title={i + 1}
              className={"btn"}
              defaultChecked={i == page}
              onChange={() => setPage(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminUserTable;

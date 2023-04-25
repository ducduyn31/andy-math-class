import { ReactPropTypes, useEffect, useState } from "react";
import { filteredInputInitial, SharedContext } from "@/layout/AdminLayout";
import AdminBookRow from "@/components/admin/Table/AdminBookRow";
import { userDatabase } from "@/components/admin/Table/AdminUserTable";
import { AdminUserRowProps } from "@/components/admin/Table/AdminUserRow";

interface Book {
  name: string;
  color: string;
  chapter: string[];
}
const bookDatabase: Book[] = [
  {
    name: "Intro to mathematic",
    color: "primary",
    chapter: ["Chapter 1.a", "Chapter 1.b", "Chapter 1.c", "Chapter 1.d"],
  },
  {
    name: "Mathematic in practice",
    color: "badge-secondary",
    chapter: ["Chapter 1", "Chapter 2", "Chapter 3"],
  },
  {
    name: "Linear Algebra and Geometry",
    color: "badge-accent",
    chapter: ["Chapter I", "Chapter II", "Chapter III", "Chapter IV"],
  },
  {
    name: "Precalculus",
    color: "badge-success",
    chapter: ["Chapter 1", "Chapter 2"],
  },
  {
    name: "Calculus I",
    color: "badge-error",
    chapter: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"],
  },
  {
    name: "Calculus II",
    color: "badge-info",
    chapter: [],
  },
];

const itemPerPage = 5;

const AdminBookTable = ({
  setBookModification,
  filteredInput,
}: {
  setBookModification: SharedContext["setBookModification"];
  filteredInput: SharedContext["filteredInput"];
}) => {
  const [page, setPage] = useState(0);
  const [dataset, setDataset] = useState<Book[]>([]);
  const { filteredBooks } = filteredInput;
  const updatePaginationItem = () => {
    const start = page * itemPerPage;
    setDataset(bookDatabase.slice(start, start + itemPerPage));
  };

  useEffect(() => {
    updatePaginationItem();
  }, [page]);

  useEffect(() => {
    const filteredBookName = filteredBooks.name;
    if (filteredBookName.length == 0) {
      return updatePaginationItem();
    }

    setDataset((prevState) => {
      return bookDatabase.filter((book) =>
        book.name.toLowerCase().includes(filteredBookName.toLowerCase())
      );
    });
  }, [filteredBooks]);

  return (
    <>
      <div className="card bg-base-100 drop-shadow-xl mt-5 md:mt-0">
        <div className={"overflow-x-auto"}>
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Chapter</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataset.map((book) => (
                <AdminBookRow
                  key={book.name}
                  name={book.name}
                  color={book.color}
                  chapter={book.chapter}
                  setBookModification={setBookModification}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={"flex justify-between mt-5"}>
        <div className="btn-group">
          {[...Array(Math.ceil(bookDatabase.length / itemPerPage))].map(
            (_, i) => (
              <input
                key={i}
                type={"radio"}
                name={"options"}
                data-title={i + 1}
                className={`btn ${
                  filteredBooks.isFiltering ? "btn-disabled" : ""
                }`}
                defaultChecked={i == page}
                onChange={() => setPage(i)}
              />
            )
          )}
        </div>
        <label
          htmlFor="book-modification-modal"
          className={"btn btn-primary"}
          onClick={() =>
            setBookModification((prevState: Book) => {
              return {
                ...prevState,
                name: "",
                chapter: [],
                color: "",
              };
            })
          }
        >
          Add book
        </label>
      </div>
    </>
  );
};

export default AdminBookTable;
export { bookDatabase };
export type { Book };

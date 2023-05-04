import { useCallback, useEffect, useState } from "react";
import { SharedContext } from "@/layout/AdminLayout";
import { AdminBookRow } from "@/components/admin/table/books-table/components/book-row";
import { Book, convertBook } from "@/models/book";
import { useAdminContext } from "@/hooks/use-admin-context";

const bookDatabase: Book[] = [
  {
    id: "0e900bb1-11ba-45b5-82ae-d710fc51dcaf",
    name: "Intro to mathematic",
    color: "primary",
    chapters: [
      {
        name: "Chapter 1",
        parent: null,
        book: null,
        id: "6f4a4679-9741-48b2-b7f8-edaa6504adca",
      },
      {
        name: "Chapter 1.a",
        parent: {
          id: "6f4a4679-9741-48b2-b7f8-edaa6504adca",
          name: "Chapter 1",
          parent: null,
          book: null,
        },
        book: null,
        id: "5f4a4679-9741-48b2-b7f8-edaa6504adca",
      },
      {
        name: "Chapter 1.b",
        parent: {
          id: "6f4a4679-9741-48b2-b7f8-edaa6504adca",
          name: "Chapter 1",
          parent: null,
          book: null,
        },
        book: null,
        id: "8c731a16-6792-453a-87ae-9433f574acbe",
      },
      {
        name: "Chapter 1.c",
        parent: {
          id: "6f4a4679-9741-48b2-b7f8-edaa6504adca",
          name: "Chapter 1",
          parent: null,
          book: null,
        },
        book: null,
        id: "24000dc4-93f1-4efe-a765-525c80cccbd2",
      },
      {
        name: "Chapter 1.d",
        parent: {
          id: "6f4a4679-9741-48b2-b7f8-edaa6504adca",
          name: "Chapter 1",
          parent: null,
          book: null,
        },
        book: null,
        id: "13755d92-8789-46cf-a23d-75fe36ee1221",
      },
    ],
  },
  {
    id: "122ca5a0-b145-4bbe-8b4e-07325678f4cc",
    name: "Mathematic in practice",
    color: "badge-secondary",
    chapters: [
      { name: "Chapter 1", parent: null, book: null, id: "1" },
      { name: "Chapter 2", parent: null, book: null, id: "2" },
      { name: "Chapter 3", parent: null, book: null, id: "3" },
    ],
  },
  {
    id: "1e900bb1-11ba-45b5-82ae-d710fc51dcaf",
    name: "Linear Algebra and Geometry",
    color: "badge-accent",
    chapters: [
      { name: "Chapter I", parent: null, book: null, id: "4" },
      { name: "Chapter II", parent: null, book: null, id: "5" },
      { name: "Chapter III", parent: null, book: null, id: "6" },
      { name: "Chapter IV", parent: null, book: null, id: "7" },
    ],
  },
  {
    id: "2e900bb1-11ba-45b5-82ae-d710fc51dcaf",
    name: "Precalculus",
    color: "badge-success",
    chapters: [
      { name: "Chapter 1", parent: null, book: null, id: "8" },
      { name: "Chapter 2", parent: null, book: null, id: "9" },
    ],
  },
  {
    id: "3e900bb1-11ba-45b5-82ae-d710fc51dcaf",
    name: "Calculus I",
    color: "badge-error",
    chapters: [
      { name: "Chapter 1", parent: null, book: null, id: "10" },
      { name: "Chapter 2", parent: null, book: null, id: "11" },
      { name: "Chapter 3", parent: null, book: null, id: "12" },
      { name: "Chapter 4", parent: null, book: null, id: "13" },
      { name: "Chapter 5", parent: null, book: null, id: "14" },
    ],
  },
  {
    id: "4e900bb1-11ba-45b5-82ae-d710fc51dcaf",
    name: "Calculus II",
    color: "badge-info",
    chapters: [],
  },
].map((book) => convertBook(book));

const itemPerPage = 5;

export const AdminBookTable = ({
  setBookModification,
  filteredInput,
}: {
  setBookModification: SharedContext["setBookModification"];
  filteredInput: SharedContext["filteredInput"];
}) => {
  const [page, setPage] = useState(0);
  const [dataset, setDataset] = useState<Book[]>([]);
  const { filteredBooks } = filteredInput;
  const { books, totalBooks } = useAdminContext();

  const updatePaginationItem = useCallback(() => {
    const start = page * itemPerPage;
    setDataset(books.slice(start, start + itemPerPage));
  }, [books, page]);

  useEffect(() => {
    updatePaginationItem();
  }, [page, updatePaginationItem]);

  useEffect(() => {
    const filteredBookName = filteredBooks.name;
    if (filteredBookName.length == 0) {
      return updatePaginationItem();
    }

    setDataset(() => {
      return books.filter((book) =>
        book.name.toLowerCase().includes(filteredBookName.toLowerCase())
      );
    });
  }, [books, filteredBooks, setDataset, updatePaginationItem]);

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
                  book={book}
                  setBookModification={setBookModification}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={"flex sm:flex-row flex-col sm:justify-between mt-5"}>
        <div className="btn-group sm:justify-start justify-center">
          {[...Array(Math.ceil(totalBooks / itemPerPage))].map((_, i) => (
            <input
              key={i}
              type={"radio"}
              name={"options"}
              data-title={i + 1}
              className={`btn ${
                filteredBooks.isFiltering ? "btn-disabled" : ""
              } flex-grow`}
              defaultChecked={i == page}
              onChange={() => setPage(i)}
            />
          ))}
        </div>
        <label
          htmlFor="book-modification-modal"
          className={"btn btn-primary mt-2 sm:mt-0"}
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

export { bookDatabase };

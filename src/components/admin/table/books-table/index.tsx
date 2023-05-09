import { useCallback, useEffect, useState } from "react";
import { SharedContext } from "@/layout/AdminLayout";
import { AdminBookRow } from "@/components/admin/table/books-table/components/book-row";
import { Book } from "@/models/book";
import { useAdminContext } from "@/hooks/use-admin-context";
import { useModal } from "@/hooks/use-modal";
import { BookModificationModal } from "@/components/admin/table/books-table/components/book-edit";

const itemPerPage = 5;

export const AdminBookTable = ({
  filteredInput,
}: {
  filteredInput: SharedContext["filteredInput"];
}) => {
  const [page, setPage] = useState(0);
  const [dataset, setDataset] = useState<Book[]>([]);
  const { filteredBooks } = filteredInput;
  const { books, totalBooks } = useAdminContext();

  const { openModal } = useModal(BookModificationModal);

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
                <AdminBookRow key={book.name} book={book} />
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
          className="btn btn-primary mt-2 sm:mt-0"
          onClick={() => openModal({ book: null })}
        >
          Add book
        </label>
      </div>
    </>
  );
};

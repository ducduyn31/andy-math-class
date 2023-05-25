import { AdminBookRow } from "@/components/admin/table/books-table/components/book-row";
import { useModal } from "@/hooks/use-modal";
import { BookModificationModal } from "@/components/admin/table/books-table/components/book-edit";
import { useFilter } from "@/hooks/use-filter-context";

export const AdminBookTable = () => {
  const { filteredBooks, pageSize, page, setPageNumber, totalSize } =
    useFilter("book");

  const { openModal } = useModal(BookModificationModal);

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
              {filteredBooks.map((book) => (
                <AdminBookRow key={book.name} book={book} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={"flex sm:flex-row flex-col sm:justify-between mt-5"}>
        <div className="btn-group sm:justify-start justify-center">
          {[...Array(Math.ceil(totalSize / pageSize))].map((_, i) => (
            <input
              key={i}
              type="radio"
              name="options"
              data-title={i + 1}
              className="btn flex-grow"
              defaultChecked={i + 1 === page}
              onChange={() => setPageNumber(i + 1)}
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

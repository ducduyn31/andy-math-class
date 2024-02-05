import { useModal } from "@/hooks/use-modal";
import { BookModificationModal } from "@/components/admin/table/books-table/components/book-edit";
import { BooksProvider } from "@/components/admin/table/books-table/components/books-provider";
import { BooksTable } from "@/components/admin/table/books-table/components/books-table";
import { BooksFilter } from "@/components/admin/table/books-table/components/books-filter";

export const AdminBookTable = () => {
  const { openModal } = useModal(BookModificationModal);

  return (
    <BooksProvider>
      <div className="flex flex-col gap-y-3">
        <BooksFilter />
        <BooksTable />
        <div className="flex sm:flex-row flex-col sm:justify-between">
          <label
            htmlFor="book-modification-modal"
            className="btn btn-primary mt-2 sm:mt-0"
            onClick={() => openModal({ book: null })}
          >
            Add book
          </label>
        </div>
      </div>
    </BooksProvider>
  );
};

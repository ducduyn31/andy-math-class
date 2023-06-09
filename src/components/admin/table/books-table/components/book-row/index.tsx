import { Book, convertBook } from "@/models";
import { useModal } from "@/hooks/use-modal";
import { BookModificationModal } from "@/components/admin/table/books-table/components/book-edit";
import { useRemoveBook } from "@/hooks/use-remove-book";
import toast from "react-hot-toast";

interface PropType {
  book: Book;
}
export const AdminBookRow = ({ book }: PropType) => {
  const { openModal } = useModal(BookModificationModal);
  const { loading, removeBook } = useRemoveBook({
    onSuccess: () => toast.success("Book removed successfully"),
  });

  return (
    <tr className={"hover"}>
      <th>{book.name}</th>
      <td>
        {book.chapters.length > 0 ? (
          book.chapters.map((each) => (
            <span key={each.id} className={`badge badge-lg mr-1 ${book.color}`}>
              {each.name}
            </span>
          ))
        ) : (
          <i>No chapter added</i>
        )}
      </td>
      <td>
        <label
          htmlFor="book-modification-modal"
          className="flex link link-primary font-bold text-sm no-underline"
          onClick={() => openModal({ book: convertBook(book) })}
        >
          Modify
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-1 w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </label>
        <label
          htmlFor="book-modification-modal"
          className="flex link link-error font-bold text-sm no-underline"
          onClick={() => removeBook(book.id)}
        >
          {loading ? "Removing..." : "Remove"}
        </label>
      </td>
    </tr>
  );
};

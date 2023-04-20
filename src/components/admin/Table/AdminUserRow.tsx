import { book } from "@/components/admin/Table/AdminBookTable";
import { SupportFunction } from "@/layout/AdminLayout";

interface AdminUserRowProps {
  firstName: string;
  lastName: string;
  email: string;
  assignedBooks: book[];
  enabled: boolean;
}

const AdminUserRow: React.FC<AdminUserRowProps & SupportFunction> = ({
  firstName,
  lastName,
  email,
  assignedBooks,
  enabled,
  setUserModification,
}) => {
  return (
    <tr className={"hover"}>
      <th>
        {firstName} {lastName}
      </th>
      <td>{email}</td>
      <td>
        {assignedBooks.length > 0 ? (
          assignedBooks.map((book, i) => (
            <span key={i} className={`badge badge-lg mr-1 ${book.color}`}>
              {book.name}
            </span>
          ))
        ) : (
          <i>No book assigned</i>
        )}
      </td>
      <td>
        <label
          htmlFor="user-modification-modal"
          className="flex link link-primary font-bold text-sm no-underline"
          onClick={() => {
            console.log("setting", firstName, lastName, email);
            setUserModification((prevState: any) => {
              return {
                ...prevState,
                firstName,
                lastName,
                email,
                assignedBooks,
                enabled,
              };
            });
          }}
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
      </td>
      <td>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          defaultChecked={enabled}
        />
      </td>
    </tr>
  );
};

export default AdminUserRow;
export type { AdminUserRowProps };

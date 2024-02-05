import toast from "react-hot-toast";
import { User } from "@/models";
import { useUpdateUser } from "@/hooks/use-update-user";
import { useModal } from "@/hooks/use-modal";
import { UserModificationModal } from "@/components/admin/table/users-table/components/user-edit";
import { VirtualItem } from "@/helpers/virtual/core";
import { AssignedBooksList } from "@/components/admin/table/users-table/components/user-row/components/assigned-books-list";

interface AdminUserRowProps {
  user: User;
  rowConfig: VirtualItem;
  index: number;
}

export const AdminUserRow = ({ user, rowConfig, index }: AdminUserRowProps) => {
  const { id, firstName, lastName, email, assignedBooks, isEnabled } = user;
  const { updateUser } = useUpdateUser({
    onSuccess: () => {
      toast.success("Saved successfully");
    },
  });
  const { openModal } = useModal(UserModificationModal);

  if (!user) {
    return null;
  }

  return (
    <tr
      className="hover"
      data-testid="user-entry"
      style={{
        height: `${rowConfig.size}px`,
        transform: `translateY(${rowConfig.start - index * rowConfig.size}px)`,
      }}
    >
      <th>
        {firstName} {lastName}
      </th>
      <td>{email}</td>
      <AssignedBooksList books={assignedBooks} heightLimit={rowConfig.size} />
      <td>
        <label
          htmlFor="user-modification-modal"
          className="flex link link-primary font-bold text-sm no-underline"
          onClick={() =>
            openModal({
              user,
            })
          }
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
          checked={isEnabled}
          onChange={() => updateUser({ id, isEnabled: !isEnabled })}
        />
      </td>
    </tr>
  );
};

export type { AdminUserRowProps };

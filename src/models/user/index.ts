import { User as _User } from "next-auth";
import { AdminUserRowProps } from "@/components/admin/table/users-table/components/user-row";
import { Book } from "@/models/book";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isEnabled: boolean;

  toRowProps: (assignedBooks?: Book[]) => AdminUserRowProps;
}

export type UserWithFields = Pick<
  User,
  "id" | "email" | "firstName" | "lastName" | "isEnabled" | "isAdmin"
>;

const mapToRowProps = (
  user: UserWithFields,
  books?: Book[]
): AdminUserRowProps => {
  return {
    id: user.id,
    assignedBooks: books || [],
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    enabled: user.isEnabled,
  };
};

export const mapUser = (user: _User): User => {
  const modelUser: UserWithFields = {
    id: user.id,
    email: user.email || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    isAdmin: !!user.isAdmin,
    isEnabled: !!user.isEnabled,
  };
  return {
    ...modelUser,
    toRowProps: () => mapToRowProps(modelUser),
  };
};

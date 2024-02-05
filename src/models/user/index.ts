import { User as _User } from "next-auth";
import { Book, convertBook } from "@/models/book";
import { AssignationsOfUserFragment, GetUsersQuery } from "@/gql/types";
import { Maybe } from "@/models/types";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isEnabled: boolean;
  assignedBooks?: Book[];
}

export const mapUser = (user: _User): User => {
  return {
    id: user.id,
    email: user.email || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    isAdmin: !!user.isAdmin,
    isEnabled: !!user.isEnabled,
  };
};

const mapAssignedBooksFromAssignationsOfUserFragment = (
  assignations: Maybe<AssignationsOfUserFragment>
): Book[] => {
  if (!assignations) return [];
  return (
    assignations?.edges?.map((assignationNode) => {
      return convertBook({
        id: assignationNode?.node?.book || "",
        name: assignationNode?.node?.books?.name || "",
      });
    }) || []
  );
};

export const mapUserFromGetUsersQuery = (response?: GetUsersQuery): User[] => {
  if (!response) return [];

  const userNodes =
    response?.usersCollection?.edges.map((edge) => edge.node) || [];

  return userNodes.map((userNode) => {
    const user: User = {
      id: userNode.id,
      email: userNode.email || "",
      firstName: userNode.firstName || "",
      lastName: userNode.lastName || "",
      isAdmin: !!userNode.isAdmin,
      isEnabled: !!userNode.isEnabled,
      assignedBooks: mapAssignedBooksFromAssignationsOfUserFragment(
        userNode?.user_books_assignationCollection
      ),
    };

    return user;
  });
};

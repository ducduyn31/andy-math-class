import { gql } from "@apollo/client";

export default gql`
  mutation UpdateUser($userId: UUID!, $updatedUser: usersUpdateInput!) {
    updateusersCollection(filter: { id: { eq: $userId } }, set: $updatedUser) {
      records {
        id
        nodeId
        email
        firstName
        lastName
        isAdmin
        isEnabled
      }
    }
  }
`;

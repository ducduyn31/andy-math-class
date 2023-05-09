import { gql } from "@apollo/client";

export default gql`
  mutation RemoveAllAssignations($userId: UUID!) {
    deleteFromuser_books_assignationCollection(
      atMost: 1000
      filter: { user: { eq: $userId } }
    ) {
      records {
        id
        nodeId
      }
    }
  }
`;

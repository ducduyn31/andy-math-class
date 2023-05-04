import { gql } from "@apollo/client";

export default gql`
  query GetAssignedBooksByUserId($userId: UUID!) {
    user_books_assignationCollection(filter: { user: { eq: $userId } }) {
      edges {
        node {
          nodeId
          id
          books {
            nodeId
            id
            name
          }
        }
      }
    }
    booksCollection {
      edges {
        node {
          nodeId
          id
          name
        }
      }
    }
  }
`;

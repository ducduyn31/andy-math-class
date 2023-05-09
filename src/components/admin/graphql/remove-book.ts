import { gql } from "@apollo/client";

export default gql`
  mutation RemoveBook($bookId: UUID!) {
    deleteFrombooksCollection(atMost: 1, filter: { id: { eq: $bookId } }) {
      records {
        id
        chaptersCollection {
          edges {
            node {
              id
              nodeId
            }
          }
        }
        user_books_assignationCollection {
          edges {
            node {
              id
              nodeId
            }
          }
        }
      }
    }
  }
`;

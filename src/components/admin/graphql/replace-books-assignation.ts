import { gql } from "@apollo/client";

export default gql`
  mutation ReplaceBooksAssignation(
    $userId: UUID!
    $assignations: [user_books_assignationInsertInput!]!
  ) {
    deleteFromuser_books_assignationCollection(
      filter: { user: { eq: $userId } }
      atMost: 1000
    ) {
      records {
        id
      }
    }
    insertIntouser_books_assignationCollection(objects: $assignations) {
      records {
        id
        users {
          id
          user_books_assignationCollection {
            edges {
              node {
                nodeId
                id
                book
              }
            }
          }
        }
      }
    }
  }
`;

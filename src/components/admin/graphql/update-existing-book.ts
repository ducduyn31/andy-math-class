import { gql } from "@apollo/client";

export default gql`
  mutation UpdateExistingBook($bookId: UUID!, $updatedBook: booksUpdateInput!) {
    updatebooksCollection(set: $updatedBook, filter: { id: { eq: $bookId } }) {
      records {
        nodeId
        id
        name
        color
        chaptersCollection {
          edges {
            node {
              nodeId
              id
              name
              book
              parent
            }
          }
        }
      }
    }
  }
`;

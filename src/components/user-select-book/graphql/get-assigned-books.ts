import { gql } from "@apollo/client";

export default gql`
  query GetAssignedBooks {
    booksCollection {
      edges {
        node {
          id
          nodeId
          name
          chaptersCollection {
            ...chaptersInBook
          }
        }
      }
    }
  }
`;

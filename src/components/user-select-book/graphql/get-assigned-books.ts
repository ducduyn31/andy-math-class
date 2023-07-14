import { gql } from "@apollo/client";

export default gql`
  query GetAssignedBooks {
    booksCollection(orderBy: { name: AscNullsLast }) {
      edges {
        node {
          id
          nodeId
          name
          chaptersCollection(orderBy: { order: AscNullsLast }) {
            ...chaptersInBook
          }
        }
      }
    }
  }
`;

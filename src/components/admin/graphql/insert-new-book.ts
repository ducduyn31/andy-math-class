import { gql } from "@apollo/client";

export default gql`
  mutation CreateNewBooks($booksInput: [booksInsertInput!]!) {
    insertIntobooksCollection(objects: $booksInput) {
      records {
        nodeId
        id
        name
        color
      }
    }
  }
`;

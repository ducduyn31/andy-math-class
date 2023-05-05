import { gql } from "@apollo/client";

export default gql`
  mutation CreateNewChapters($chaptersInput: [chaptersInsertInput!]!) {
    insertIntochaptersCollection(objects: $chaptersInput) {
      records {
        nodeId
        id
        name
        book
        parent
      }
    }
  }
`;

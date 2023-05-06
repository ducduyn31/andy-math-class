import { gql } from "@apollo/client";

export default gql`
  mutation CreateNewQuestion($newQuestion: [questionsInsertInput!]!) {
    insertIntoquestionsCollection(objects: $newQuestion) {
      records {
        nodeId
        id
        name
        description
      }
    }
  }
`;

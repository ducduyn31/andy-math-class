import { gql } from "@apollo/client";

export default gql`
  mutation LinkAnswerImages($answerImages: [answerInsertInput!]!) {
    insertIntoanswerCollection(objects: $answerImages) {
      records {
        nodeId
        id
        image
        question
      }
    }
  }
`;

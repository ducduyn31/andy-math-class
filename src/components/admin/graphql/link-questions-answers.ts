import { gql } from "@apollo/client";

export default gql`
  mutation LinkQuestionsAnswers(
    $questionImages: [question_imagesInsertInput!]!
    $answerImages: [answerInsertInput!]!
  ) {
    insertIntoquestion_imagesCollection(objects: $questionImages) {
      records {
        nodeId
        id
        image
      }
    }
    insertIntoanswerCollection(objects: $answerImages) {
      records {
        nodeId
        id
        image
      }
    }
  }
`;

import { gql } from "@apollo/client";

export default gql`
  mutation LinkQuestionsImages(
    $questionImages: [question_imagesInsertInput!]!
  ) {
    insertIntoquestion_imagesCollection(objects: $questionImages) {
      records {
        nodeId
        id
        image
        question
      }
    }
  }
`;

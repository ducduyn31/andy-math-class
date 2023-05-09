import { gql } from "@apollo/client";

export default gql`
  mutation RemoveImagesFromQuestion(
    $imagePaths: [String!]!
    $questionId: UUID!
  ) {
    deleteFromquestion_imagesCollection(
      atMost: 1000
      filter: { image: { in: $imagePaths }, question: { eq: $questionId } }
    ) {
      records {
        id
        nodeId
        question
      }
    }
  }
`;

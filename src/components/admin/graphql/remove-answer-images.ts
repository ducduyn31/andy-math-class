import { gql } from "@apollo/client";

export default gql`
  mutation RemoveAnswersFromQuestion(
    $imagePaths: [String!]!
    $questionId: UUID!
  ) {
    deleteFromanswerCollection(
      atMost: 1000
      filter: { question: { eq: $questionId }, image: { in: $imagePaths } }
    ) {
      records {
        id
        nodeId
        question
      }
    }
  }
`;

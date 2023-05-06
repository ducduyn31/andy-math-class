import { gql } from "@apollo/client";

export default gql`
  mutation UpdateExistingQuestion(
    $questionID: UUID!
    $question: questionsUpdateInput!
  ) {
    updatequestionsCollection(
      filter: { id: { eq: $questionID } }
      set: $question
    ) {
      records {
        id
        nodeId
        name
        description
        chapters {
          id
          nodeId
          name
        }
        books {
          id
          nodeId
          name
        }
      }
    }
  }
`;

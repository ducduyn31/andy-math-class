import { gql } from "@apollo/client";

export default gql`
  mutation RemoveQuestion($questionId: UUID!) {
    deleteFromquestionsCollection(filter: { id: { eq: $questionId } }) {
      records {
        id
        nodeId
        answerCollection {
          ...answersInQuestion
        }
        question_imagesCollection {
          ...imagesOfQuestion
        }
      }
    }
  }
`;

import { gql } from "@apollo/client";

export default gql`
  query GetAnswersForQuestion($questionId: UUID!) {
    answerCollection(filter: { question: { eq: $questionId } }) {
      ...answersInQuestion
    }
  }
`;

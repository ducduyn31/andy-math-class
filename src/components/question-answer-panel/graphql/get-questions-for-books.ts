import { gql } from "@apollo/client";

export default gql`
  query GetQuestionsForChapters($chapterIds: [UUID!]!) {
    questionsCollection(filter: { chapter: { in: $chapterIds } }) {
      edges {
        node {
          nodeId
          id
          name
          description
          question_imagesCollection {
            ...imagesOfQuestion
          }
        }
      }
    }
  }
`;

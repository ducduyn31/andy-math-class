import { gql } from "@apollo/client";

export default gql`
  query GetPageQuestions($limit: Int, $cursor: Cursor) {
    questionsCollection(
      orderBy: { created_at: DescNullsLast }
      first: $limit
      after: $cursor
    ) {
      edges {
        node {
          nodeId
          id
          name
          description
          books {
            nodeId
            id
            name
          }
          chapters {
            nodeId
            id
            name
          }
          answerCollection {
            ...answersInQuestion
          }
          question_imagesCollection {
            ...imagesOfQuestion
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  fragment answersInQuestion on answerConnection {
    edges {
      node {
        nodeId
        id
        name
        image
        order
      }
    }
  }

  fragment imagesOfQuestion on question_imagesConnection {
    edges {
      node {
        nodeId
        id
        image
        order
      }
    }
  }
`;

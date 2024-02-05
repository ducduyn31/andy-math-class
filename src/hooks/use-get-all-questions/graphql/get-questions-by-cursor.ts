import { gql } from "@apollo/client";

export default gql`
  query GetQuestions(
    $limit: Int
    $cursor: Cursor
    $bookId: UUIDFilter
    $chapterId: UUIDFilter
  ) {
    questionsCollection(
      orderBy: { created_at: DescNullsLast, name: AscNullsFirst }
      first: $limit
      after: $cursor
      filter: { book: $bookId, chapter: $chapterId }
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

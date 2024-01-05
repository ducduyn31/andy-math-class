import { gql } from "@apollo/client";

export default gql`
  query GetPageBooks($limit: Int, $cursor: Cursor) {
    booksCollection(
      orderBy: { created_at: DescNullsLast, name: AscNullsLast }
      first: $limit
      after: $cursor
    ) {
      edges {
        node {
          nodeId
          id
          color
          name
          chaptersCollection(orderBy: { name: AscNullsLast }) {
            ...chaptersInBook
          }
          user_books_assignationCollection {
            ...assignationsInBook
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  fragment chaptersInBook on chaptersConnection {
    edges {
      node {
        nodeId
        id
        name
        parent
        order
      }
    }
  }

  fragment assignationsInBook on user_books_assignationConnection {
    edges {
      node {
        nodeId
        id
        user
        book
      }
    }
  }
`;

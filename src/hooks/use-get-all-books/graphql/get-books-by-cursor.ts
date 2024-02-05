import { gql } from "@apollo/client";

export default gql`
  query GetBooks(
    $limit: Int
    $cursor: Cursor
    $bookName: StringFilter
    $bookIds: UUIDFilter
  ) {
    booksCollection(
      orderBy: { created_at: DescNullsLast, name: AscNullsLast }
      first: $limit
      after: $cursor
      filter: { name: $bookName, id: $bookIds }
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

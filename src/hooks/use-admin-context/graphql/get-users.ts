import { gql } from "@apollo/client";

export default gql`
  query GetPageUsers($limit: Int, $cursor: Cursor) {
    usersCollection(
      orderBy: { firstName: AscNullsLast }
      first: $limit
      after: $cursor
    ) {
      edges {
        node {
          nodeId
          id
          firstName
          email
          lastName
          isAdmin
          isEnabled
          user_books_assignationCollection {
            ...assignationsOfUser
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  fragment assignationsOfUser on user_books_assignationConnection {
    edges {
      node {
        nodeId
        id
        book
      }
    }
  }
`;

import { gql } from "@apollo/client";

export default gql`
  query GetUsers(
    $limit: Int
    $cursor: Cursor
    $firstNameFilter: StringFilter
    $emailFilter: StringFilter
    $statusFilter: BooleanFilter
  ) {
    usersCollection(
      orderBy: { firstName: AscNullsLast }
      filter: {
        firstName: $firstNameFilter
        email: $emailFilter
        isEnabled: $statusFilter
      }
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
        books {
          name
        }
      }
    }
  }
`;

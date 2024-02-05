import { gql } from "@apollo/client";

export default gql`
  query GetUser($email: StringFilter!) {
    usersCollection(filter: { email: $email }) {
      edges {
        node {
          nodeId
          id
          firstName
          email
          lastName
          isEnabled
          isAdmin
        }
      }
    }
  }
`;

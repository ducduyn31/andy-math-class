import { gql } from "@apollo/client";

export default gql`
  query GetUser {
    usersCollection {
      edges {
        node {
          nodeId
          id
          firstName
          email
          lastName
          isEnabled
        }
      }
    }
  }
`;

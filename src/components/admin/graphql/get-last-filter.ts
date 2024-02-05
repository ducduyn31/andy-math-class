import { gql } from "@apollo/client";

export default gql`
  query GetLastFilter($email: String!) {
    userResponse: usersCollection(filter: { email: { eq: $email } }) {
      edges {
        node {
          nodeId
          filter_statesCollection(
            last: 1
            filter: { category: { eq: "user" } }
            orderBy: { created_at: AscNullsFirst }
          ) {
            ...filterStateOfUser
          }
        }
      }
    }
    bookResponse: usersCollection(filter: { email: { eq: $email } }) {
      edges {
        node {
          nodeId
          filter_statesCollection(
            last: 1
            filter: { category: { eq: "book" } }
            orderBy: { created_at: AscNullsFirst }
          ) {
            ...filterStateOfUser
          }
        }
      }
    }
    questionResponse: usersCollection(filter: { email: { eq: $email } }) {
      edges {
        node {
          nodeId
          filter_statesCollection(
            last: 1
            filter: { category: { eq: "question" } }
            orderBy: { created_at: AscNullsFirst }
          ) {
            ...filterStateOfUser
          }
        }
      }
    }
  }

  fragment filterStateOfUser on filter_statesConnection {
    edges {
      node {
        nodeId
        id
        state
        email
      }
    }
  }
`;

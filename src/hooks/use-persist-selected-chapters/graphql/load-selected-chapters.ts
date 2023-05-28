import { gql } from "@apollo/client";

export default gql`
  query LoadLastSelectedChapters($email: String!) {
    chapters_select_stateCollection(
      filter: { email: { eq: $email } }
      orderBy: { created_at: DescNullsLast }
      first: 1
    ) {
      edges {
        node {
          nodeId
          state
        }
      }
    }
  }
`;

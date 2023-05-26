import { gql } from "@apollo/client";

export default gql`
  mutation UpdateLastFilter(
    $email: String!
    $filter: JSON!
    $category: String!
  ) {
    insertIntofilter_statesCollection(
      objects: { category: $category, email: $email, state: $filter }
    ) {
      affectedCount
    }
  }
`;

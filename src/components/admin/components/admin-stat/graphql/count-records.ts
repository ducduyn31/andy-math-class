import { gql } from "@apollo/client";

export default gql`
  query CountRecords {
    usersCollection {
      totalCount
    }
    booksCollection {
      totalCount
    }
    questionsCollection {
      totalCount
    }
  }
`;

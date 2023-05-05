import { gql } from "@apollo/client";

export default gql`
  mutation RemoveChapters($chapterIds: [UUID!]!) {
    deleteFromchaptersCollection(
      filter: { id: { in: $chapterIds } }
      atMost: 1000
    ) {
      records {
        id
        nodeId
        name
        book
      }
    }
  }
`;

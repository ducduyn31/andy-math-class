import { gql } from "@apollo/client";

export default gql`
  mutation UpdateChapterOrder($chapterId: UUID!, $order: Int!) {
    updatechaptersCollection(
      filter: { id: { eq: $chapterId } }
      set: { order: $order }
    ) {
      affectedCount
    }
  }
`;

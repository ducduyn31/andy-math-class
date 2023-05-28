import { gql } from "@apollo/client";

export default gql`
  mutation SaveSelectedChapters(
    $selectedChapters: chapters_select_stateInsertInput!
  ) {
    insertIntochapters_select_stateCollection(objects: [$selectedChapters]) {
      affectedCount
    }
  }
`;

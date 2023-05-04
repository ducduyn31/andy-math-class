import { gql } from "@apollo/client";

export default gql`
  query GetAllForAdmin {
    booksCollection {
      edges {
        node {
          nodeId
          id
          color
          name
          chaptersCollection {
            edges {
              node {
                nodeId
                id
                name
              }
            }
          }
        }
      }
    }
    questionsCollection {
      edges {
        node {
          nodeId
          id
          name
          description
          books {
            nodeId
            id
            name
          }
          chapters {
            nodeId
            id
            name
          }
        }
      }
    }
  }
`;

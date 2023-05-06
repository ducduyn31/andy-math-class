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
            ...chaptersInBook
          }
          user_books_assignationCollection {
            ...assignationsInBook
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
          answerCollection {
            ...answersInQuestion
          }
          question_imagesCollection {
            ...imagesOfQuestion
          }
        }
      }
    }
  }

  fragment chaptersInBook on chaptersConnection {
    edges {
      node {
        nodeId
        id
        name
      }
    }
  }

  fragment assignationsInBook on user_books_assignationConnection {
    edges {
      node {
        nodeId
        id
        user
        book
      }
    }
  }

  fragment answersInQuestion on answerConnection {
    edges {
      cursor
      node {
        nodeId
        id
        name
        image
      }
    }
  }

  fragment imagesOfQuestion on question_imagesConnection {
    edges {
      node {
        nodeId
        id
        image
      }
    }
  }
`;

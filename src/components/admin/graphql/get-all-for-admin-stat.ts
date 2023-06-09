import { gql } from "@apollo/client";

export default gql`
  query GetAllForAdmin {
    booksCollection(
      orderBy: { created_at: DescNullsLast, name: AscNullsLast }
    ) {
      edges {
        node {
          nodeId
          id
          color
          name
          chaptersCollection(orderBy: { name: AscNullsLast }) {
            ...chaptersInBook
          }
          user_books_assignationCollection {
            ...assignationsInBook
          }
        }
      }
    }
    questionsCollection(orderBy: { created_at: DescNullsLast }) {
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
    usersCollection(orderBy: { firstName: AscNullsLast }) {
      edges {
        node {
          nodeId
          id
          firstName
          email
          lastName
          isAdmin
          isEnabled
          user_books_assignationCollection {
            ...assignationsOfUser
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
        parent
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
      node {
        nodeId
        id
        name
        image
        order
      }
    }
  }

  fragment imagesOfQuestion on question_imagesConnection {
    edges {
      node {
        nodeId
        id
        image
        order
      }
    }
  }

  fragment assignationsOfUser on user_books_assignationConnection {
    edges {
      node {
        nodeId
        id
        book
      }
    }
  }
`;

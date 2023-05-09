import { gql } from "@apollo/client";

export default gql`
  mutation SignUp($email: String!, $newUser: usersUpdateInput!) {
    updateusersCollection(filter: { email: { eq: $email } }, set: $newUser) {
      records {
        id
        firstName
        lastName
        email
        isEnabled
        isAdmin
      }
    }
  }
`;

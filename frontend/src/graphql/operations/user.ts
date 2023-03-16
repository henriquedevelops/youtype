import { gql } from "@apollo/client";

/* The gql function is used to parse the GraphQL code into
a synthax that can be used by the Apollo client to send the
mutation to the GraphQL server. */

export default {
  Queries: {
    /* This operation triggers the query called (SearchUsers). 
    It takes the target username as the only argument and it
    returns an array of users found. */
    searchUsers: gql`
      query ($targetUsername: String!) {
        searchUsers(targetUsername: $targetUsername) {
          id
          username
        }
      }
    `,
  },

  Mutations: {
    /* saveUsername mutation takes a single argument, 
    "inputUsername", which is of type "String!". The mutation 
    returns an object with two fields: "success" and "error". */
    saveUsernameGQL: gql`
      mutation ($inputUsername: String!) {
        saveUsernameMutation(inputUsername: $inputUsername)
      }
    `,
  },
  Subscriptions: {},
};

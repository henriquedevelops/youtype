import { gql } from "@apollo/client";

/* The gql function is used to parse the GraphQL code into
a synthax that can be interpreted by the Apollo client to 
send the mutation to the GraphQL server. */

/* Structure of the conversation object that is returned
 */
const populatedConversationFields = `
  id
  participants {
    user {
      id
      username
    }
    hasSeenLatestMessage
  }
  latestMessage {
    id
    sender {
      id
      username
    }
    body
    createdAt
  }
  updatedAt`;

export default {
  Queries: {
    /* Query for conversations populated with participants and
    latest message */
    getAllConversations: gql`
      query { getAllConversations {${populatedConversationFields}}}
    `,
    getConversationById: gql`
      query ($selectedConversationId: String!) {
        getConversationById(selectedConversationId: $selectedConversationId) {${populatedConversationFields}}
      }
    `,
  },

  Mutations: {
    /* Triggers the mutation called(createConversation). 
    It takes an array of participant ids as arguments and returns
    the Id of the newly created conversation */
    createConversation: gql`
      mutation ($participantsIds: [String]!) {
        createConversation(participantsIds: $participantsIds) {
          newConversationId
        }
      }
    `,
  },

  Subscriptions: {
    conversationCreation: gql`
     subscription {
      conversationCreation 
        { ${populatedConversationFields}}
     }
    `,
  },
};

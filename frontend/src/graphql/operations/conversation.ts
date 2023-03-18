import { gql } from "@apollo/client";
import { populatedMessageFields } from "./message";

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
    ${populatedMessageFields}
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
      query ($selectedConversationId: String) {
        getConversationById(selectedConversationId: $selectedConversationId) {${populatedConversationFields}}
      }
    `,
  },

  Mutations: {
    createConversation: gql`
      mutation ($participantsIds: [String]!) {
        createConversation(participantsIds: $participantsIds) {
          newConversationId
        }
      }
    `,

    markConversationAsRead: gql`
      mutation ($selectedConversationId: String!) {
        markConversationAsRead(selectedConversationId: $selectedConversationId)
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

    conversationUpdate: gql`
    subscription {
      conversationUpdate{
          ${populatedConversationFields}
      }
    }
    `,
  },
};

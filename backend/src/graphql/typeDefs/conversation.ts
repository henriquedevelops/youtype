import gql from "graphql-tag";

export default gql`
  scalar Date

  type CreateConversationResponse {
    newConversationId: String
  }

  type Conversation {
    id: String
    latestMessage: Message
    participants: [Participant]
    createdAt: Date
    updatedAt: Date
  }

  type Participant {
    id: String
    user: User
    hasSeenLatestMessage: Boolean
  }

  type ConversationUpdateData {
    updatedConversation: Conversation
  }

  type Query {
    getAllConversations: [Conversation]
    getConversationById(selectedConversationId: String): Conversation
  }

  type Mutation {
    createConversation(participantsIds: [String]): CreateConversationResponse
    markConversationAsRead(selectedConversationId: String!): Boolean
  }

  type Subscription {
    conversationCreation: Conversation
    conversationUpdate: Conversation
  }
`;

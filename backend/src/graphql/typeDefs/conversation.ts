import { gql } from "apollo-server-core";

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

  type Query {
    getAllConversations: [Conversation]
    getConversationById(selectedConversationId: String): Conversation
  }

  type Mutation {
    createConversation(participantsIds: [String]): CreateConversationResponse
  }

  type Subscription {
    conversationCreation: Conversation
  }
`;

import { Prisma } from "@prisma/client";
import { populatedConversation } from "../graphql/resolvers/conversation";

/* The data that is returned from createConversationMutation. */
export interface CreateConversationData {
  createConversation: {
    newConversationId: string;
  };
}

/* The data that we pass to the createConversationMutation
  as argument */
export interface CreateConversationInput {
  participantsIds: Array<string>;
}

/* Structure of the conversations that are populated with the 
  reusable prisma query (generated by prisma) named as 
  "populatedConversation" */
export type PopulatedConversation = Prisma.ConversationGetPayload<{
  include: typeof populatedConversation;
}>;

export interface ConversationCreationSubscriptionPayload {
  conversationCreation: PopulatedConversation;
}

export interface ConversationUpdateData {
  updatedConversation: PopulatedConversation;
}

import { ConversationPopulated } from "../../../backend/src/typescriptTypes/conversation";

/* Structure of the data that is returned from 
createConversationMutation. */
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

/* Structure of the data returned by the 
  getAllConversation query */
export interface getAllConversationData {
  conversations: Array<ConversationPopulated>;
}

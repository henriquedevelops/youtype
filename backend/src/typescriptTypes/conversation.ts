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

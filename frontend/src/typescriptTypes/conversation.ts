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

/* Structure of each element of the array that
  is returned by the getAllConversations query */
type PopulatedConversation = {
  id: string;
  latestMessageId: string | null;
  createdAt: Date;
  updatedAt: Date;
} & {
  participants: ({
    id: string;
    userId: string;
    conversationId: string;
    hasSeenLatestMessage: boolean;
    createdAt: Date;
    updatedAt: Date;
  } & {
    user: {
      id: string;
      username: string | null;
    };
  })[];
  latestMessage:
    | ({
        id: string;
        conversationId: string;
        senderId: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;
      } & {})
    | null;
};

/* Structure of the data returned by the 
  getAllConversation query */
export interface getAllConversationData {
  conversations: Array<PopulatedConversation>;
}

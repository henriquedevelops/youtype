export interface Message {
  sender: {
    id: string;
    username: string | null;
  };
  body: string;
  createdAt: Date;
}

export interface getAllMessagesData {
  getAllMessages: Message[];
}

export interface GetAllMessagesArgument {
  selectedConversationId: string | undefined;
}

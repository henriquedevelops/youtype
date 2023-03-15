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

export interface ArgumentsCreateMessage {
  selectedConversationId: string;
  senderId: string;
  messageBody: string;
}

export interface CreateMessageReturn {
  createMessage: boolean;
}

export interface MessageSubscriptionData {
  subscriptionData: {
    data: {
      messageCreation: Message;
    };
  };
}

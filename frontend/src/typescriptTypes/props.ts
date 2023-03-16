import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { getAllConversationData, PopulatedConversation } from "./conversation";
import { Message } from "./message";

export interface HomeProps {
  currentSession: Session | null;
}

export interface MessageInputFieldProps {
  setAllMessagesFromThisConversation: Dispatch<SetStateAction<Message[]>>;
}

export interface MessagesFeedProps {
  allMessagesFromThisConversation: Message[] | undefined;
}

export interface ChatProps {}

export interface HeaderProps {}

export interface ConversationItemProps {
  conversation: PopulatedConversation;
}

export interface ListAllConversationsProps {
  allConversations: PopulatedConversation[];
}

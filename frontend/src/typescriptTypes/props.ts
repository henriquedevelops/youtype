import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { Message } from "./message";

export interface HomeProps {
  currentSession: Session | null;
}

export interface MessageInputFieldProps {
  allMessagesFromThisConversation: Message[];
  setAllMessagesFromThisConversation: Dispatch<SetStateAction<Message[]>>;
}

export interface MessagesFeedProps {
  allMessagesFromThisConversation: Message[] | undefined;
  subscribeToNewMessages: (selectedConversationId: string) => void;
}

export interface ChatProps {}

export interface HeaderProps {}

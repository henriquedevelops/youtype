import { Session } from "next-auth";
import { Message } from "./message";

export interface HomeProps {
  currentSession: Session | null;
}

export interface MessageInputFieldProps {}

export interface MessagesFeedProps {
  allMessages: Message[] | undefined;
  subscribeToNewMessages: (selectedConversationId: string) => void;
}

export interface ChatProps {}

export interface HeaderProps {}

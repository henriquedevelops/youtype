import { OperationVariables, SubscribeToMoreOptions } from "@apollo/client";
import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { getAllConversationData, PopulatedConversation } from "./conversation";
import { GetAllMessagesArgument, getAllMessagesData, Message } from "./message";

export interface HomeProps {
  currentSession: Session | null;
}

export interface MessageInputFieldProps {
  setAllMessagesFromThisConversation: Dispatch<SetStateAction<Message[]>>;
}

export interface MessagesFeedProps {
  allMessagesFromThisConversation: Message[] | undefined;
  subscribeToMoreMessages: <
    TSubscriptionData = getAllMessagesData,
    TSubscriptionVariables extends OperationVariables = GetAllMessagesArgument
  >(
    options: SubscribeToMoreOptions<
      getAllMessagesData,
      TSubscriptionVariables,
      TSubscriptionData
    >
  ) => () => void;
}

export interface ChatProps {}

export interface HeaderProps {}

export interface ConversationItemProps {
  singleConversation: PopulatedConversation;
}

export interface ListAllConversationsProps {
  allConversations: PopulatedConversation[];
}

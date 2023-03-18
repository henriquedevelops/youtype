import { MessageSubscriptionData } from "@/src/typescriptTypes/message";
import { MessagesFeedProps } from "@/src/typescriptTypes/props";
import { SelectedConversationContext } from "@/src/util/util";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC, useContext, useEffect } from "react";
import { MessageItem } from "./MessageItem";
import MessageOperations from "@/src/graphql/operations/message";

export const MessagesFeed: FC<MessagesFeedProps> = ({
  allMessagesFromThisConversation,
  subscribeToMoreMessages,
}) => {
  const { data: currentSession } = useSession();
  const selectedConversationId = useRouter().query
    .selectedConversationId as string;

  /* Subscribe/unsubscribe to messages everytime selected conversation changes */
  useEffect(() => {
    const unsubscribe = subscribeToNewMessages(selectedConversationId);

    return () => unsubscribe();
  }, [selectedConversationId]);

  /* Function that triggers the subscription to new messages */
  const subscribeToNewMessages = (selectedConversationId: string) => {
    return subscribeToMoreMessages({
      document: MessageOperations.Subscriptions.messageCreation,
      variables: {
        selectedConversationId,
      },

      /* "allMessagesFromThisCOnversation" will be updated with the 
      value returned from this function (which includes the new message 
        when there is one) */
      updateQuery: (
        previousMessages,
        { subscriptionData: newMessage }: MessageSubscriptionData
      ) => {
        if (!newMessage) return previousMessages;

        return Object.assign({}, previousMessages, {
          getAllMessages: [
            newMessage.data.messageCreation,
            ...previousMessages.getAllMessages,
          ],
        });
      },
    });
  };

  return (
    <Flex direction="column-reverse" overflowY="scroll" height="100%">
      {allMessagesFromThisConversation &&
        allMessagesFromThisConversation.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            wasSentByCurrentUser={message.sender.id === currentSession?.user.id}
          />
        ))}
    </Flex>
  );
};

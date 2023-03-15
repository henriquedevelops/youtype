import MessageOperations from "@/src/graphql/operations/message";
import {
  GetAllMessagesArgument,
  getAllMessagesData,
  MessageSubscriptionData,
} from "@/src/typescriptTypes/message";
import { ChatProps } from "@/src/typescriptTypes/props";
import { SelectedConversationContext } from "@/src/util/util";
import { useQuery } from "@apollo/client";
import { Flex, Skeleton } from "@chakra-ui/react";
import { FunctionComponent as FC, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Header } from "./Header";
import { MessageInputField } from "./MessageInputField";
import { MessagesFeed } from "./MessagesFeed";

/* 
Component that contains the header with the name selected
conversation participants, the feed with messages sent/received, 
and the input field where the user types a new message
*/

const Chat: FC<ChatProps> = () => {
  /* Querying all messages from selected conversation and 
    setting up variables for later executing the function that
    triggers the subscription to receive real-time updates */
  const selectedConversationId = useContext(
    SelectedConversationContext
  ) as string;
  const {
    data: getAllMessagesData,
    loading: isLoadingMessages,
    error: errorLoadingMessages,
    subscribeToMore,
  } = useQuery<getAllMessagesData, GetAllMessagesArgument>(
    MessageOperations.Query.getAllMessages,
    {
      variables: {
        selectedConversationId,
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    }
  );
  if (errorLoadingMessages) return null;
  const allMessages = getAllMessagesData?.getAllMessages;

  /* Function that triggers the subscription to new messages */
  const subscribeToNewMessages = (selectedConversationId: string) => {
    return subscribeToMore({
      document: MessageOperations.Subscriptions.messageCreation,
      variables: {
        selectedConversationId,
      },

      /* "allMessages" will be updated with the value returned
      from this function (which includes the new message 
        when there is one) */
      updateQuery: (
        previousMessages,
        { subscriptionData: newMessage }: MessageSubscriptionData
      ) => {
        console.log("abdaf");
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

  console.log(getAllMessagesData);

  return (
    <>
      {isLoadingMessages ? (
        <Skeleton
          variant="rect"
          width="100%"
          height="100%"
          borderRadius={7}
          startColor="blackAlpha.400"
          endColor="whiteAlpha.200"
        />
      ) : (
        <Flex
          display={{
            base: selectedConversationId ? "flex" : "none",
            md: "flex",
          }}
          width="100%"
          direction="column"
        >
          {selectedConversationId ? (
            <Flex
              direction="column"
              justify="space-between"
              overflow="hidden"
              flexGrow={1}
            >
              <Header />
              <MessagesFeed
                allMessages={allMessages}
                subscribeToNewMessages={subscribeToNewMessages}
              />
              <MessageInputField />
            </Flex>
          ) : (
            <Flex>Nextype Messenger</Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Chat;

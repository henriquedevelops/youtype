import MessageOperations from "@/src/graphql/operations/message";
import {
  GetAllMessagesArgument,
  getAllMessagesData,
  Message,
  MessageSubscriptionData,
} from "@/src/typescriptTypes/message";
import { ChatProps } from "@/src/typescriptTypes/props";
import { SelectedConversationContext } from "@/src/util/util";
import { useQuery } from "@apollo/client";
import { Flex, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FunctionComponent as FC,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Header } from "./Header";
import { MessageInputField } from "./MessageInputField";
import { MessagesFeed } from "./MessagesFeed";

/* 
Component that contains the header with the name of the participants
from selected conversation, the feed with messages sent/received, 
and the input field where the user types a new message
*/

const Chat: FC<ChatProps> = () => {
  /* Query all messages from selected conversation and 
  set up variables for later executing the function that
  triggers the subscription to receive real-time updates */
  const [allMessagesFromThisConversation, setAllMessagesFromThisConversation] =
    useState<Message[]>([]);
  const selectedConversationId = useRouter().query
    .selectedConversationId as string;
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

  /* Replace optimistically rendered messages with "real" messages after 
  receiving a success response from the useQuery hook */
  useEffect(() => {
    getAllMessagesData?.getAllMessages &&
      setAllMessagesFromThisConversation(getAllMessagesData.getAllMessages);
  }, [getAllMessagesData?.getAllMessages]);

  return (
    <>
      {selectedConversationId && isLoadingMessages ? (
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
          {selectedConversationId && (
            <Flex
              direction="column"
              justify="space-between"
              overflow="hidden"
              flexGrow={1}
            >
              <Header />
              <MessagesFeed
                allMessagesFromThisConversation={
                  allMessagesFromThisConversation
                }
                subscribeToMoreMessages={subscribeToMore}
              />
              <MessageInputField
                setAllMessagesFromThisConversation={
                  setAllMessagesFromThisConversation
                }
              />
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Chat;

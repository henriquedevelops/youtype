import { PopulatedConversation } from "@/src/typescriptTypes/conversation";
import { ChatProps } from "@/src/typescriptTypes/props";
import { SelectedConversationContext } from "@/src/util/util";
import { useQuery } from "@apollo/client";
import { Flex, Skeleton } from "@chakra-ui/react";
import { FunctionComponent as FC, useContext, useState } from "react";
import { Header } from "./Header";
import { MessageInputField } from "./MessageInputField";
import { MessagesFeed } from "./MessagesFeed";
import {
  GetAllMessagesArgument,
  getAllMessagesData,
} from "@/src/typescriptTypes/message";
import MessageOperations from "@/src/graphql/operations/message";
import toast from "react-hot-toast";

/* 
Component that contains the feed with messages sent/received, 
the input to type a new message and the header with the name 
of the participants
*/

const Chat: FC<ChatProps> = () => {
  const selectedConversationId = useContext(SelectedConversationContext);
  const {
    data: getAllMessagesData,
    loading: isLoadingMessages,
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
  const allMessages = getAllMessagesData?.getAllMessages;

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
              <MessagesFeed allMessages={allMessages} />
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

import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center, Flex, Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ButtonStartConversation from "./ButtonStartConversation";
import conversationsOperations from "../../../graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import { getAllConversationData } from "@/src/typescriptTypes/conversation";
import ListAllConversation from "./list/ListAllConversation";

interface ConversationsControllerProps {}

/* 
This component is the left bar of the chat, it contains the button
"Start a conversation" and the list of all conversations from currently
authenticated user (from which he can choose the current conversation).
*/

const ConversationsController: FC<ConversationsControllerProps> = () => {
  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
      <ButtonStartConversation />
      <ListAllConversation />
    </Box>
  );
};

export default ConversationsController;

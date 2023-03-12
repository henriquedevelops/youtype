import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC } from "react";
import ButtonStartConversation from "./ButtonStartConversation";
import ListAllConversation from "./list/ListAllConversation";

interface ConversationsControllerProps {}

/* 
This component is the left bar of the chat, it contains the button
"Start a conversation" and the list of all conversations from currently
authenticated user (from which he can choose the current conversation).
*/

const ConversationsController: FC<ConversationsControllerProps> = () => {
  const nextRouter = useRouter();
  const selectedConversationId = nextRouter.query
    .selectedConversationId as string;

  return (
    <Box
      display={{ base: selectedConversationId ? "none" : "block", md: "block" }}
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
    >
      <ButtonStartConversation />
      <ListAllConversation />
    </Box>
  );
};

export default ConversationsController;

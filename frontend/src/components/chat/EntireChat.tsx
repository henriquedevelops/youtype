import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center, Flex } from "@chakra-ui/react";
// import ConversationsController from "./controller/ConversationsController";
import MessagePanel from "./message-panel/MessagePanel";
import { Session } from "next-auth";
import ConversationsController from "./controller/ConversationsController";
import { useRouter } from "next/router";

interface ChatProps {
  currentSession: Session;
}

/* 
Component that contains the entire chat.
(Rendered when user is logged in)
*/

const EntireChat: FC<ChatProps> = () => {
  const nextRouter = useRouter();
  const selectedConversationId = nextRouter.query
    .selectedConversationId as string;

  return (
    <Flex height="100vh">
      <ConversationsController />
      <MessagePanel selectedConversationId={selectedConversationId} />
    </Flex>
  );
};

export default EntireChat;

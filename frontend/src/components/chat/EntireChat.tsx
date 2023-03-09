import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center, Flex } from "@chakra-ui/react";
// import ConversationsController from "./controller/ConversationsController";
import CurrentConversation from "./current/CurrentConversation";
import { Session } from "next-auth";
import ConversationsController from "./controller/ConversationsController";

interface ChatProps {
  currentSession: Session;
}

/* 
Component that contains the entire chat.
(Rendered when user is logged in)
*/

const EntireChat: FC<ChatProps> = () => {
  return (
    <Flex height="100vh">
      <ConversationsController />
      <CurrentConversation />
      {/* <Button onClick={() => signOut()}>Logout</Button> */}
    </Flex>
  );
};

export default EntireChat;

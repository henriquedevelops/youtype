import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center, Flex } from "@chakra-ui/react";
import WrapAllConversations from "./Conversations/WrapAllConversations";
import WrapCurrentConversation from "./currentConversation/WrapCurrentConversation";
import { Session } from "next-auth";

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
      <WrapAllConversations />
      <WrapCurrentConversation />
      {/* <Button onClick={() => signOut()}>Logout</Button> */}
    </Flex>
  );
};

export default EntireChat;

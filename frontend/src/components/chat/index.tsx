import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center, Flex } from "@chakra-ui/react";
import WrapperChatsList from "./list/wrapperChatsList";
import WrapperCurrentChat from "./current/wrapperCurrentChat";
import { Session } from "next-auth";

interface ChatProps {
  currentSession: Session;
}

/* 
Component that contains the entire chat.
(for when user is already successfully logged in)
*/

const Chat: FC<ChatProps> = ({ currentSession }) => {
  return (
    <Flex height="100vh">
      CHAT
      <Button onClick={() => signOut()}>Logout</Button>
      <WrapperChatsList currentSession={currentSession} />
      <WrapperCurrentChat currentSession={currentSession} />
    </Flex>
  );
};

export default Chat;

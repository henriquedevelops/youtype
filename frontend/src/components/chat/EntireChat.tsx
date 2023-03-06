import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center, Flex } from "@chakra-ui/react";
import WrapperListOfChats from "./list/WrapperListOfChats";
import WrapperCurrentChat from "./current/wrapperCurrentChat";
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
      <WrapperListOfChats />
      <WrapperCurrentChat />
      <Button onClick={() => signOut()}>Logout</Button>
    </Flex>
  );
};

export default EntireChat;

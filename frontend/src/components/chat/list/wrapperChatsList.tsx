import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";

interface wrapperChatsListProps {
  currentSession: Session;
}

/* 
This wrapper component contains some core logic that can
be reused in its child components
*/

const WrapperChatsList: FC<wrapperChatsListProps> = ({ currentSession }) => {
  return <div>Chats List Wrapper</div>;
};

export default WrapperChatsList;

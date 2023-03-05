import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";

interface chatsListProps {
  currentSession: Session;
}

/* 
This component contains the list of chats from the 
currently authenticated user ordered by most recent
activity.
*/

const ChatsList: FC<chatsListProps> = ({ currentSession }) => {
  return <div>fda</div>;
};

export default ChatsList;

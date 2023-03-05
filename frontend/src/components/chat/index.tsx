import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center } from "@chakra-ui/react";

interface ChatProps {}

/* 
Component that contains the entire chat.
(for when user is already successfully logged in)
*/

const Chat: FC<ChatProps> = (props) => {
  return (
    <div>
      CHAT
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Chat;

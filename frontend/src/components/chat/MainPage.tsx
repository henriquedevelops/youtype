import { SelectedConversationContext } from "@/src/util/util";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC } from "react";
import Chat from "./chat/Chat";
import ConversationsController from "./controller/ConversationsController";

/* 
This is rendered when user loggs in and it contains everything that
is rendered on the screen 
*/

const MainPage: FC = () => {
  /* Verifying if there is a selected conversation */
  const selectedConversationId = useRouter().query.selectedConversationId as
    | string
    | undefined;

  return (
    <Flex height="100vh">
      <SelectedConversationContext.Provider value={selectedConversationId}>
        <ConversationsController />
        <Chat />
      </SelectedConversationContext.Provider>
    </Flex>
  );
};
export default MainPage;

import { signOut } from "next-auth/react";
import { createContext, FunctionComponent as FC } from "react";
import { Button, Center, Flex } from "@chakra-ui/react";
import Chat from "./chat/Chat";
import ConversationsController from "./controller/ConversationsController";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import conversationsOperations from "@/src/graphql/operations/conversation";
import {
  GetConversationByIdData,
  QueryConversationByIdArgument,
} from "@/src/typescriptTypes/conversation";
import { SelectedConversationContext } from "@/src/util/util";
import toast from "react-hot-toast";

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

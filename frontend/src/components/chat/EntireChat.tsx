import { signOut } from "next-auth/react";
import { createContext, FunctionComponent as FC } from "react";
import { Button, Center, Flex } from "@chakra-ui/react";
// import ConversationsController from "./controller/ConversationsController";
import SelectedConversation from "./selected-conversation/SelectedConversation";
import ConversationsController from "./controller/ConversationsController";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import conversationsOperations from "@/src/graphql/operations/conversation";
import {
  GetConversationByIdData,
  QueryConversationByIdArgument,
} from "@/src/typescriptTypes/conversation";
import { SelectedConversationContext } from "@/src/util/context";

/* 
Component that contains the entire chat.
(Rendered when user is logged in)
*/

const EntireChat: FC = () => {
  /* Verifying if there is a selected conversation */
  const selectedConversationId = useRouter().query
    .selectedConversationId as string;

  /* Fetching data from the selected conversation */
  const { data: GetConversationByIdData, loading: isLoadingConversation } =
    useQuery<GetConversationByIdData, QueryConversationByIdArgument>(
      conversationsOperations.Queries.getConversationById,
      { variables: { selectedConversationId } }
    );
  const selectedConversation = GetConversationByIdData?.getConversationById;

  return (
    <Flex height="100vh">
      <SelectedConversationContext.Provider value={{ selectedConversation }}>
        <ConversationsController />
        <SelectedConversation />
      </SelectedConversationContext.Provider>
    </Flex>
  );
};

export default EntireChat;

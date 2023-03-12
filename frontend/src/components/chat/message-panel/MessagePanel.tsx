import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC } from "react";
import { HeaderMessagePanel } from "./HeaderMessagePanel";
import conversationsOperations from "../../../graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import {
  GetConversationByIdData,
  QueryConversationByIdArgument,
} from "@/src/typescriptTypes/conversation";

interface MessagePanelProps {
  selectedConversationId: string;
}

/* 

*/

const MessagePanel: FC<MessagePanelProps> = ({ selectedConversationId }) => {
  const nextRouter = useRouter();

  const { data: GetConversationByIdData, loading: isLoadingConversation } =
    useQuery<GetConversationByIdData, QueryConversationByIdArgument>(
      conversationsOperations.Queries.getConversationById,
      { variables: { selectedConversationId } }
    );
  const selectedConversation = GetConversationByIdData?.getConversationById;

  return (
    <Flex
      display={{ base: selectedConversationId ? "flex" : "block" }}
      width="100%"
      direction="column"
    >
      {selectedConversationId ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
        >
          {selectedConversation && (
            <HeaderMessagePanel selectedConversation={selectedConversation} />
          )}
          Messages here
        </Flex>
      ) : (
        <Flex>Nextype Messenger</Flex>
      )}
    </Flex>
  );
};

export default MessagePanel;

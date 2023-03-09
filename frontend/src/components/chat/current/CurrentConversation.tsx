import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC } from "react";

interface CurrentConversationProps {}

/* 
This wrapper component contains some core logic that can
be reused in its child components
*/

const CurrentConversation: FC<CurrentConversationProps> = () => {
  /* Extracting current conversation id */
  const nextRouter = useRouter();
  const { conversationId: currentConversationId } = nextRouter.query;

  return (
    <Flex
      display={{ base: currentConversationId ? "flex" : "block" }}
      width="100%"
      direction="column"
    >
      {currentConversationId ? (
        <Flex>Current conversation</Flex>
      ) : (
        <Flex>Nextype Messenger</Flex>
      )}
    </Flex>
  );
};

export default CurrentConversation;

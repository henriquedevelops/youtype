import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC } from "react";

interface WrapCurrentConversationProps {}

/* 
This wrapper component contains some core logic that can
be reused in its child components
*/

const WrapCurrentConversation: FC<WrapCurrentConversationProps> = () => {
  /* Extracting current conversation id */
  const nextRouter = useRouter();
  const { conversationId: currentConversationId } = nextRouter.query;

  return (
    <Flex
      display={{ base: currentConversationId ? "flex" : "none" }}
      width="100%"
      direction="column"
      border="1px solid red"
    >
      {currentConversationId ? (
        <Flex>Current chat</Flex>
      ) : (
        <Flex>Nextype Messenger</Flex>
      )}
    </Flex>
  );
};

export default WrapCurrentConversation;

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
  const { selectedConversationId } = nextRouter.query;

  return (
    <Flex
      display={{ base: selectedConversationId ? "flex" : "block" }}
      width="100%"
      direction="column"
    >
      {selectedConversationId ? (
        <Flex>Current conversation</Flex>
      ) : (
        <Flex>Nextype Messenger</Flex>
      )}
    </Flex>
  );
};

export default CurrentConversation;

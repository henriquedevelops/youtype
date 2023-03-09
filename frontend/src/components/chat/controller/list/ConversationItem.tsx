import { Flex } from "@chakra-ui/react";
import { FunctionComponent as FC } from "react";

interface ConversationItemProps {}

/* 
This component holds a single conversation item do be rendered on
the list of conversations and can be selected by the user
*/

const ConversationItem: FC<ConversationItemProps> = () => {
  return <Flex>Uma conversa</Flex>;
};

export default ConversationItem;

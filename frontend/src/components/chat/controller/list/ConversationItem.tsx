import { PopulatedConversation } from "@/src/typescriptTypes/conversation";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent as FC } from "react";

interface ConversationItemProps {
  conversation: PopulatedConversation;
}

/* 
This component holds a single conversation item do be rendered on
the list of conversations and can be selected by the user
*/

const ConversationItem: FC<ConversationItemProps> = ({ conversation }) => {
  return (
    <Stack p={4} _hover={{ bg: "whiteAlpha.200" }}>
      <Text> {conversation.id}</Text>
    </Stack>
  );
};

export default ConversationItem;

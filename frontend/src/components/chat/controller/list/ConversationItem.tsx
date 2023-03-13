import { PopulatedConversation } from "@/src/typescriptTypes/conversation";
import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { FunctionComponent as FC, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import {
  formatParticipantsUsernames,
  formatRelativeLocale,
} from "@/src/util/util";
import { useSession } from "next-auth/react";

interface ConversationItemProps {
  conversation: PopulatedConversation;
  isSelected: boolean;
  handleSelectConversation: (selectedConversationId: string) => Promise<void>;
}

/* 
This component holds a single conversation item to be rendered on
the list of conversations and can be selected by the user
*/

const ConversationItem: FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  handleSelectConversation,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const loggedUserId = useSession().data?.user.id;

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={3}
      cursor="pointer"
      borderRadius={4}
      bg={isSelected ? "whiteAlpha.100" : "none"}
      _hover={{ bg: "whiteAlpha.100" }}
      position="relative"
      onClick={() => handleSelectConversation(conversation.id)}
    >
      <Avatar />
      <Flex justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {loggedUserId &&
              formatParticipantsUsernames(
                conversation.participants,
                loggedUserId
              )}
          </Text>
          {conversation.latestMessage && (
            <Box width="140%" maxWidth="360px">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {conversation.latestMessage.body}
              </Text>
            </Box>
          )}
        </Flex>
        <Text
          color="whiteAlpha.700"
          textAlign="right"
          position="absolute"
          right={4}
        >
          {formatRelative(new Date(conversation.updatedAt), new Date(), {
            locale: {
              ...enUS,
              formatRelative: (token) =>
                formatRelativeLocale[
                  token as keyof typeof formatRelativeLocale
                ],
            },
          })}
        </Text>
      </Flex>
    </Stack>
  );
};

export default ConversationItem;

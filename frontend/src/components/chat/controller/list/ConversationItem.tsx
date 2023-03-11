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
}

/* 
This component holds a single conversation item to be rendered on
the list of conversations and can be selected by the user
*/

const ConversationItem: FC<ConversationItemProps> = ({
  conversation,
  isSelected,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: currentSession } = useSession();

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={isSelected ? "whiteAlpha.200" : "none"}
      _hover={{ bg: "whiteAlpha.200" }}
      position="relative"
    >
      <Menu>
        <MenuList bg="#2d2d2d">
          <MenuItem
            icon={<AiOutlineEdit fontSize={20} />}
            onClick={(event) => {
              event.stopPropagation();
              //   onEditConversation();
            }}
            bg="#2d2d2d"
            _hover={{ bg: "whiteAlpha.300" }}
          >
            Edit
          </MenuItem>
          <MenuItem
            icon={<MdDeleteOutline fontSize={20} />}
            onClick={(event) => {
              event.stopPropagation();
            }}
            bg="#2d2d2d"
            _hover={{ bg: "whiteAlpha.300" }}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <Flex position="absolute" left="-6px"></Flex>
      <Avatar />
      <Flex justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {currentSession?.user?.id &&
              formatParticipantsUsernames(
                conversation.participants,
                currentSession?.user?.id
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
          right={2}
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

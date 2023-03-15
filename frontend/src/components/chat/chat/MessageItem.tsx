import { FunctionComponent as FC } from "react";
import { MessageItemProps } from "@/src/typescriptTypes/message";
import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import { enUS } from "date-fns/locale";

export const MessageItem: FC<MessageItemProps> = ({
  message,
  wasSentByCurrentUser,
}) => {
  const formattedDate = formatRelative(
    new Date(message.createdAt),
    new Date(),
    { locale: enUS }
  );
  return (
    <Stack
      direction="row"
      p={4}
      spacing={4}
      justify={wasSentByCurrentUser ? "flex-end" : "flex-start"}
      wordBreak="break-word"
    >
      {!wasSentByCurrentUser && (
        <Flex align="flex-end">
          <Avatar size="sm" />
        </Flex>
      )}
      <Stack spacing={1} width="100%">
        <Stack
          direction="row"
          align="center"
          justify={wasSentByCurrentUser ? "flex-end" : "flex-start"}
        >
          {!wasSentByCurrentUser && (
            <Text
              fontWeight={500}
              textAlign={wasSentByCurrentUser ? "right" : "left"}
            >
              {message.sender.username}
            </Text>
          )}
          <Text fontSize={14} color="whiteAlpha.700">
            {formattedDate},
          </Text>
        </Stack>
        <Flex
          direction="row"
          justify={wasSentByCurrentUser ? "flex-end" : "flex-start"}
        >
          <Box
            bg={wasSentByCurrentUser ? "brand.100" : "whiteAlpha.300"}
            px={2}
            py={1}
            borderRadius={12}
            maxWidth="65%"
          >
            <Text>{message.body}</Text>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
};

import { HeaderMessagePanelProps } from "@/src/typescriptTypes/conversation";
import { formatParticipantsUsernames } from "@/src/util/util";
import { Button, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FunctionComponent as FC } from "react";

export const HeaderMessagePanel: FC<HeaderMessagePanelProps> = ({
  selectedConversation,
}) => {
  const loggedUserId = useSession().data?.user.id;

  return (
    <Stack
      direction="row"
      align="center"
      spacing={6}
      py={5}
      px={{ base: 4, md: 0 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      {selectedConversation && loggedUserId && (
        <Stack direction="row">
          <Text color="whiteAlpha.600">To: </Text>
          <Text fontWeight={600}>
            {formatParticipantsUsernames(
              selectedConversation.participants,
              loggedUserId
            )}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};

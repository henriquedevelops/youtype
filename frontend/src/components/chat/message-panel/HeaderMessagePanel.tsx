import { HeaderMessagePanelProps } from "@/src/typescriptTypes/message";
import { formatParticipantsUsernames } from "@/src/util/util";
import { Button, Stack } from "@chakra-ui/react";
import { FunctionComponent as FC } from "react";

export const HeaderMessagePanel: FC<HeaderMessagePanelProps> = ({
  selectedConversationId,
}) => {
  return (
    <Stack
      direction="row"
      align="center"
      spacing={6}
      py={5}
      px={{ base: 4, md: 0 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    ></Stack>
  );
};

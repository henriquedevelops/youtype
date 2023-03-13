import { HeaderProps } from "@/src/typescriptTypes/conversation";
import { formatParticipantsUsernames } from "@/src/util/util";
import { Button, Icon, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC } from "react";
import { FaArrowLeft } from "react-icons/fa";

export const Header: FC<HeaderProps> = ({ selectedConversation }) => {
  const loggedUserId = useSession().data?.user.id;
  const nextRouter = useRouter();

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
      <Button
        display={{ md: "none" }}
        onClick={() =>
          nextRouter.replace("?selectedConversationId", "/", {
            shallow: true,
          })
        }
      >
        <Icon as={FaArrowLeft} />
      </Button>
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

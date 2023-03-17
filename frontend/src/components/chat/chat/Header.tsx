import { HeaderProps } from "@/src/typescriptTypes/props";
import { SelectedConversationContext } from "@/src/util/util";
import { formatParticipantsUsernames } from "@/src/util/util";
import { useQuery } from "@apollo/client";
import { Button, Icon, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  GetConversationByIdData,
  QueryConversationByIdArgument,
} from "@/src/typescriptTypes/conversation";
import conversationsOperations from "@/src/graphql/operations/conversation";
import toast from "react-hot-toast";

export const Header: FC<HeaderProps> = () => {
  const loggedUserId = useSession().data?.user.id;
  const nextRouter = useRouter();
  const selectedConversationId = nextRouter.query
    .selectedConversationId as string;
  const {
    data: GetConversationByIdData,
    loading: isLoadingGetConversationById,
  } = useQuery<GetConversationByIdData, QueryConversationByIdArgument>(
    conversationsOperations.Queries.getConversationById,
    {
      variables: { selectedConversationId },
      onError: ({ message }) => {
        toast.error(message);
      },
    }
  );

  const selectedConversation = GetConversationByIdData?.getConversationById;

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

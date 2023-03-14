import MessageOperations from "@/src/graphql/operations/message";
import {
  GetAllMessagesArgument,
  getAllMessagesData,
} from "@/src/typescriptTypes/message";
import { MessagesFeedProps } from "@/src/typescriptTypes/props";
import { SelectedConversationContext } from "@/src/util/util";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import {
  Dispatch,
  FunctionComponent as FC,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import toast from "react-hot-toast";

export const MessagesFeed: FC<MessagesFeedProps> = ({ allMessages }) => {
  const selectedConversationId = useContext(SelectedConversationContext);

  return (
    <>
      {allMessages && (
        <Flex direction="column" justify="flex-end" overflow="hidden">
          {allMessages?.map((message) => (
            <div>{message.body}</div>
          ))}
        </Flex>
      )}
    </>
  );
};

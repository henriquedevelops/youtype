import { MessageInputFieldProps } from "@/src/typescriptTypes/props";
import { useMutation } from "@apollo/client";
import { Box, Input } from "@chakra-ui/react";
import { FunctionComponent as FC, useState, FormEvent } from "react";
import { toast } from "react-hot-toast";
import MessageOperations from "@/src/graphql/operations/message";
import {
  ArgumentsCreateMessage,
  CreateMessageReturn,
  Message,
} from "@/src/typescriptTypes/message";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";

/* 
The message input (located at the bottom of the chat window)
*/

export const MessageInputField: FC<MessageInputFieldProps> = ({
  allMessagesFromThisConversation,
  setAllMessagesFromThisConversation,
}) => {
  /* Setting up variables for later executing the createMessage mutation */
  const [newMessageBody, setNewMessageBody] = useState("");

  const selectedConversationId = useRouter().query
    .selectedConversationId as string;
  const { data: currentSession } = useSession();
  const [triggerCreateMessageMutation, {}] = useMutation<
    CreateMessageReturn,
    ArgumentsCreateMessage
  >(MessageOperations.Mutation.createMessage, {
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  /* Execute the createMessage mutation (onSubmit) */
  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (!currentSession?.user?.name) return new Error("Session expired.");

      const optimisticMessage: Message = {
        id: nanoid(), // Generate a temporary ID for the optimistic message
        body: newMessageBody,
        sender: {
          id: currentSession.user.id,
          username: currentSession.user.name,
        },
        createdAt: new Date(),
      };

      // Add the optimistic message to the list of messages
      setAllMessagesFromThisConversation((previousMessages) => [
        optimisticMessage,
        ...previousMessages,
      ]);

      await triggerCreateMessageMutation({
        variables: {
          messageBody: newMessageBody,
          selectedConversationId,
          senderId: currentSession.user.id,
        },
        optimisticResponse: {
          createMessage: true,
        },
      });

      // Pass the temporary ID to the mutation
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={4} width="100%">
      <form onSubmit={handleSendMessage}>
        <Input
          value={newMessageBody}
          onChange={(event) => setNewMessageBody(event.target.value)}
          placeholder="Say something nice"
          resize="none"
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "whiteAlpha.400",
          }}
        />
      </form>
    </Box>
  );
};

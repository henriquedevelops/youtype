import { MessageInputFieldProps } from "@/src/typescriptTypes/props";
import { useMutation } from "@apollo/client";
import { Box, Input } from "@chakra-ui/react";
import { FunctionComponent as FC, useState, FormEvent } from "react";
import { toast } from "react-hot-toast";
import MessageOperations from "@/src/graphql/operations/message";
import {
  ArgumentsCreateMessage,
  CreateMessageReturn,
} from "@/src/typescriptTypes/message";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

/* 
The message input (located at the bottom of the chat window)
*/

export const MessageInputField: FC<MessageInputFieldProps> = () => {
  /* Setting up variables for later executing the createMessage mutation */
  const [inputMessage, setInputMessage] = useState("");
  const selectedConversationId = useRouter().query
    .selectedConversationId as string;
  const { data: currentSession } = useSession();
  const [triggerCreateMessageMutation, { data: createMessageData }] =
    useMutation<CreateMessageReturn, ArgumentsCreateMessage>(
      MessageOperations.Mutation.createMessage,
      {
        onError: (error) => {
          console.log(error);

          toast.error(error.message);
        },
      }
    );

  /* Execute the createMessage mutation (onSubmit) */
  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (!currentSession) return new Error("Session expired.");
      const {} = await triggerCreateMessageMutation({
        variables: {
          messageBody: inputMessage,
          selectedConversationId,
          senderId: currentSession?.user.id,
        },
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={4} width="100%">
      <form onSubmit={handleSendMessage}>
        <Input
          value={inputMessage}
          onChange={(event) => setInputMessage(event.target.value)}
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

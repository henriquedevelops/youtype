import { MessageInputFieldProps } from "@/src/typescriptTypes/props";
import { Box, Input } from "@chakra-ui/react";
import { FunctionComponent as FC, useState, FormEvent } from "react";
import { toast } from "react-hot-toast";

/* 
The input located at the bottom of the SelectedConversation component
*/

export const MessageInputField: FC<MessageInputFieldProps> = () => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    try {
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={4} width="100%">
      <form onSubmit={() => {}}>
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

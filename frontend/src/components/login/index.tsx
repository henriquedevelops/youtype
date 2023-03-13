import { signIn, useSession } from "next-auth/react";
import { FunctionComponent as FC, useState } from "react";
import { Button, Center, Stack, Text, Image, Input } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import userOperations from "../../graphql/operations/user";
import toast from "react-hot-toast";
import { Session } from "next-auth";
import {
  argumentSaveUsername,
  DataSaveUsername,
  LoginProps,
} from "@/src/typescriptTypes/users";

/* Component that contains the login functionality */
const Login: FC<LoginProps> = () => {
  const [inputUsername, setInputUsername] = useState("");

  const { data: currentSession } = useSession();

  /* Creating the function that triggers the username mutation */
  const [saveUsername, { loading, error }] = useMutation<
    DataSaveUsername,
    argumentSaveUsername
  >(userOperations.Mutations.saveUsernameGQL);

  /* Automatically refetching the page after a user update */
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  /* Handler for "onClick" in the save username button */
  const handleSaveUsername = async () => {
    if (!inputUsername) return;
    try {
      /* Triggering saveUsername mutation */
      const { data } = await saveUsername({ variables: { inputUsername } });

      /* Error handling */
      if (!data?.saveUsernameMutation) {
        throw new Error();
      }
      if (data.saveUsernameMutation.error) {
        const {
          saveUsernameMutation: { error },
        } = data;
        throw new Error(error);
      }
      toast.success("Username succesfully saved ✔");

      /* Automatically refetching the session */
      reloadSession();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Center height="100vh">
      <Stack spacing={8} align="center">
        {currentSession ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={inputUsername}
              onChange={(event) => setInputUsername(event.target.value)}
            />
            <Button
              width="100%"
              isLoading={loading}
              onClick={handleSaveUsername}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">nextype</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image height="20px" src="/images/googlelogo.png" />}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Login;

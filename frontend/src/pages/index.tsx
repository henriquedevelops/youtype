import { Box } from "@chakra-ui/react";
import type { NextPage as Page, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Chat from "../components/chat";
import Login from "../components/login";

// Server-side rendering
export async function getServerSideProps(context: NextPageContext) {
  // Extracting current session information from incoming request
  const currentSession = await getSession(context);

  // Passing pre-rendered data to the page component as props
  return {
    props: {
      currentSession,
    },
  };
}

// Main page component
const Home: Page = () => {
  // Extracting current session information from props
  const { data: currentSession } = useSession();

  // Automatically refetching the page after a user update
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  console.log(currentSession);

  // If user is logged in send him to chat, if not, send him to login
  return (
    <Box>
      {currentSession?.user?.username ? (
        <Chat />
      ) : (
        <Login currentSession={currentSession} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export default Home;

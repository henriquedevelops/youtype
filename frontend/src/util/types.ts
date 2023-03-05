import { Session } from "next-auth";

// Structure of the component props
export interface LoginProps {
  currentSession: Session | null;
  reloadSession: () => void;
}

// Structure of the 'data' object returned by the useMutation hook
export interface DataSaveUsername {
  saveUsernameMutation: {
    success: boolean;
    error: string;
  };
}

// Structure of the argument that is passed to the 'saveUsername' function as arguments
export interface argumentSaveUsername {
  inputUsername: string;
}

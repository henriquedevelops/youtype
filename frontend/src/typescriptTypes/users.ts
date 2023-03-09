import { Session } from "next-auth";

/* Structure of this modal component props */
export interface ModalSearchUsersProps {
  modalIsOpen: boolean;
  handleOpenCloseModal: () => void;
}

/* Structure of the argument that is passed to 
   the "triggerSearchUsersQuery" function */
export interface SearchUsersInput {
  targetUsername: string;
}

/* Structure of the data that is returned by the 
    "triggerSearchUsersQuery" function*/
export interface SearchUsersResult {
  searchUsers: Array<UserFound>;
}

/* Structure of the 'data' object returned by the 
    useMutation hook  */
export interface DataSaveUsername {
  saveUsernameMutation: {
    success: boolean;
    error: string;
  };
}

/* Structure of the argument that is passed to
   the 'saveUsername' function as arguments */
export interface argumentSaveUsername {
  inputUsername: string;
}

/* Structure of each user element of the array
   returned by the search */
export interface UserFound {
  id: string;
  username: string;
}

/* Structure of the Login component props */
export interface LoginProps {
  currentSession: Session | null;
  reloadSession: () => void;
}

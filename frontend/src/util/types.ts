import { Session } from "next-auth";

/*  Structure of the 'data' object returned by the 
useMutation hook  */
export interface DataSaveUsername {
  saveUsernameMutation: {
    success: boolean;
    error: string;
  };
}

/*  Structure of the argument that is passed to
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

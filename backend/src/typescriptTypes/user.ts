export interface User {
  id: string;
  username: string;
  image: string;
  email: string;
  name: string;
}

export interface SaveUsernameResponse {
  success?: boolean;
  error?: string;
}

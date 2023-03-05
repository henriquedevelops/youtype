import "next-auth";

// This file adds custom properties to the default Next.JS 'User' interface

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
  }
}

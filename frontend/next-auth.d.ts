import NextAuth, {DefaultSession} from "next-auth";

declare module "next-auth" {
  
  interface Session {
    user: {
      email: string;
      id: number;
      role: string;
      username: string;
    };
  }
  interface Token {
    email : string;
    id: number;
    role: string;
    username: string;
  }
  interface User {
    email: string;
    id: number;
    role: string;
    username: string;
  }
}

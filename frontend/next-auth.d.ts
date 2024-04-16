import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    id: number | string;
    role: string;
    username: string;
  }

  interface Session {
    user: {
      email: string;
      id: number | string;
      role: string;
      username: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number | string;
    username: string;
    email: string;
    role: string;
  }
}

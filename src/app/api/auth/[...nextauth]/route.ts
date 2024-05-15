import NextAuth from "next-auth/next";
import { authOptions } from "@/authOptions";

export const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };

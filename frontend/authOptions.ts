import { type NextAuthOptions, SessionStrategy } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type Session, type User } from "next-auth";
import { JWT } from "next-auth/jwt";
const frontURL = process.env.NEXTAUTH_URL;
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 7 * 24 * 60 * 60, // one week
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // one week
  },

  providers: [
    Credentials({
      id: "register",
      type: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const registerCredentials = {
          username: credentials?.username,
          email: credentials?.email,
          password: credentials?.password,
        };
        const resp = await fetch(frontURL + "/api/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerCredentials),
        });
        const user = await resp.json();
        if (user && resp.ok && !user.error) {
          return user;
        }
        if (user.error.message) {
          throw new Error(user.error.message);
        } else {
          console.log("check your credentials");
          throw new Error(user.error);
          // return null;
        }
      },
    }),

    Credentials({
      id: "login",
      type: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const loginCredentials = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const resp = await fetch(frontURL + "/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginCredentials),
        });

        const user = await resp.json();

        if (user && resp.ok && !user.error) {
          return user;
        }
        if (user.error.message) {
          throw new Error(user.error.message);
        } else {
          console.log("check your credentials");
          throw new Error(user.error);
          // return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: User }) => {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },

    session: ({ session, token }: { session: Session; token: JWT }) => {
      if (token) {
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

import type { NextAuthOptions, SessionStrategy, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
        if (!credentials) {
          return null;
        }
        const registerCredentials = {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        };
        const resp = await fetch(frontURL + "/api/users/register", {
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
          throw new Error(user.error);
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
        if (!credentials) {
          return null;
        }
        const loginCredentials = {
          email: credentials.email,
          password: credentials.password,
        };
        const resp = await fetch(frontURL + "/api/users/login", {
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
          throw new Error(user.error);
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update" && session) {
        token.email = session.email;
        token.id = session.id;
        token.role = session.role;
        token.username = session.username;
      }

      if (user && trigger === "signIn") {
        token.email = user.email;
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }

      return token;
    },

    session: ({ token, session }) => {
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

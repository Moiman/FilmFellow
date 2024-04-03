import { NextAuthOptions, SessionStrategy } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type Session, type User, Token } from "next-auth";
const frontURL = process.env.NEXTAUTH_URL;
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 7 * 24 * 60 * 60, // one week
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // one week
  },
  /*
  pages: {
    // signIn: "/register",
  },
*/
  providers: [
    Credentials({
      // name: "Register",
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
        // console.log(credentialDetails);
        const resp = await fetch(frontURL + "/api/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerCredentials),
        });
        // console.log(resp);
        const user = await resp.json();
        // console.log(user);
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
      // name: "Login",
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
        // console.log(credentialDetails);
        const resp = await fetch(frontURL + "/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginCredentials),
        });
        // console.log(resp);
        const user = await resp.json();
        // console.log(user);
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
    jwt: async ({ token, user }: { token: any; user: any }) => {
      // console.log(user);
      if (user) {
        //  console.log(user);
        token.email = user.email;
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        // token.username = user.data.auth.userName;
        // token.user_type = user.data.auth.userType;
        // token.accessToken = user.data.auth.token;
      }
      // console.log(token);
      return token;
    },

    session: ({ session, token, user }: { session: any; token: any; user?: any }) => {
      if (token) {
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
        // session.user.username = token.userName;
        // session.user.accessToken = token.accessToken;
      }
      // console.log(session);
      return session;
    },
  },
};

"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    const response = await signIn("login", {
      ...credentials,
      redirect: true,
      callbackUrl: "/",
    });
    if (response?.error) {
      console.log(response.error);
    }
  };
  return (
    <main>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          required
          onChange={e => setPassword(e.target.value)}
          type="password"
          name="password"
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

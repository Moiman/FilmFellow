"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const credentials = {
      username: username,
      email: email,
      password: password,
    };
    const response = await signIn("register", {
      ...credentials,
      redirect: true,
      callbackUrl: "/",
    });
    if (response?.error) {
      console.log(response.error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        onChange={e => setUsername(e.target.value)}
        value={username}
        required
      />
      <input
        type="email"
        name="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        required
      />
      <input
        required
        onChange={e => setPassword(e.target.value)}
        type="password"
        name="password"
        value={password}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

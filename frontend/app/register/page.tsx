"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const credentials = {
      username: username,
      email: email,
      password: password,
    };

    const response = await signIn("register", {
      ...credentials,
      redirect: false,
      // callbackUrl: "/",
    });
    if (response?.error) {
      setError(response.error);
    }

    if (response?.ok) {
      router.push("/");
    }
  };

  return (
    <main>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
          value={username}
          required
        />
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
      {error}
    </main>
  );
}

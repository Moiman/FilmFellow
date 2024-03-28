"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };

    const response = await signIn("login", {
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
    // console.log(response?.error);
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
      {error}
    </main>
  );
}

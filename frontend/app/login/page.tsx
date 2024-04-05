"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Eye, EyeOff } from "react-feather";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

const loginUserSchema = yup.object({
  email: yup.string().trim().required("Email is required").email("Must be a valid email"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginUserSchema),
  });

  const router = useRouter();
  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    const credentials = {
      email: data.email,
      password: data.password,
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
    <main className="loginForm">
      <h2 className="loginText">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email")}
        />
        {errors?.email && <p className="error-text">{errors?.email?.message}</p>}
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
        />
        <button onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye /> : <EyeOff />}</button>
        {errors?.password && <p className="error-text">{errors?.password?.message}</p>}
        <button
          className="login-submit"
          type="submit"
          disabled={isSubmitting}
        >
          Login
        </button>
        <div className="login-route-change">
          <Link href="/">Cant login ?</Link>
          <p> / </p>
          <Link href="/register">Register</Link>
        </div>
      </form>
      <p className="error-text">{error}</p>
    </main>
  );
}

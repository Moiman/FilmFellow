"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Eye, EyeOff } from "react-feather";
import Link from "next/link";
import { Section } from "@/components/section";
import { useRouter } from "next/navigation";

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
    reset,
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
    const credentials = {
      email: data.email,
      password: data.password,
    };

    const response = await signIn("login", {
      ...credentials,
      redirect: false,
    });
    if (response?.error) {
      setError(response.error);
    }
    if (response?.ok) {
      reset();
      setError("");
      router.push("/");
    }
  };
  const loginHeader = (
    <div className="form-main-text">
      <h2>Login</h2>
    </div>
  );
  return (
    <main className="form-main">
      <div className="section-wrapper">
        <Section header={loginHeader}>
          <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              required
              autoComplete="username"
            />
            {errors?.email && <p className="error-text">{errors?.email?.message}</p>}
            <label htmlFor="password">Password</label>
            <div className="form-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                required
                autoComplete="current-password"
              />
              <button
                className="form-group-icon button-transparent"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors?.password && <p className="error-text">{errors?.password?.message}</p>}
            <button
              className="form-submit"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>
            <p
              className="error-text"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {error}
            </p>
            <div className="form-route-change">
              <Link href="/">Cant login?</Link>
              <p> / </p>
              <Link href="/register">Register</Link>
            </div>
          </form>
        </Section>
      </div>
    </main>
  );
}

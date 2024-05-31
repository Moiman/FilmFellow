"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Eye, EyeOff } from "react-feather";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Section } from "@/components/section";
import { ErrorMessage } from "@/components/errorMessage";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerUserSchema = yup.object({
  email: yup.string().trim().required("Email is required").email("Must be a valid email"),
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .matches(/^[^<>{};]*$/, "Username contains invalid characters")
    .min(2, "Username too short, minimum length is 2")
    .max(50, "Username too long, max length is 50"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])/, "Password requires atleast 1 regural character")
    .matches(/^(?=.*[A-Z])/, "Password requires atleast 1 capital character")
    .matches(/^(?=.*[0-9])/, "Password requires atleast 1 number")
    .matches(/^(?=.*[!@#$%^&*])/, "Password requires atleast 1 special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registerUserSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: RegisterFormData) => {
    const credentials = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const response = await signIn("register", {
      ...credentials,
      redirect: false,
    });
    if (!response) {
      setError("Register failed");
      return;
    }
    if (response.error) {
      setError(response.error);
      return;
    }
    if (response.ok) {
      reset();
      setError("");
      router.push("/");
    }
  };
  const registerHeader = (
    <div className="form-main-text">
      <h2>Create an account</h2>
    </div>
  );
  return (
    <main className="form-main">
      <div className="section-wrapper">
        <Section header={registerHeader}>
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
            />
            {errors?.email && <ErrorMessage message={errors.email.message} />}
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              {...register("username")}
              required
              autoComplete="nickname"
            />
            {errors?.username && <ErrorMessage message={errors.username.message} />}
            <label htmlFor="password">Password</label>
            <div className="form-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                required
                autoComplete="new-password"
              />
              <button
                data-cy="show-password"
                className="form-group-icon button-transparent"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors?.password && <ErrorMessage message={errors.password.message} />}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="form-group">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                required
                autoComplete="new-password"
              />
              <button
                data-cy="show-confirm-password"
                className="form-group-icon button-transparent"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors?.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />}
            <button
              className="form-submit"
              type="submit"
              disabled={isSubmitting}
            >
              Register
            </button>

            {error !== "" && <ErrorMessage message={error} />}
            <div className="form-route-change">
              <p style={{ lineHeight: "0.9rem" }}>Already have an account? </p>
              <Link href="/login">Login</Link>
            </div>
          </form>
        </Section>
      </div>
    </main>
  );
}

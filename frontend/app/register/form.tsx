"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Eye, EyeOff } from "react-feather";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { Section } from "@/components/section";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  retypepassword: string;
}

const registerUserSchema = yup.object({
  email: yup.string().trim().required("Email is required").email("Must be a valid email"),
  username: yup
    .string()
    .trim()
    .required("Username is required")
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
  retypepassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [retypeShowPassword, retypesetShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      retypepassword: "",
    },
    resolver: yupResolver(registerUserSchema),
  });

  const router = useRouter();
  const onSubmit = async (data: RegisterFormData) => {
    console.log(data);
    const credentials = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const response = await signIn("register", {
      ...credentials,
      redirect: false,
    });
    if (response?.error) {
      setError(response.error);
    }

    if (response?.ok) {
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
          <>
            <form
              className="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email")}
              />
              {errors?.email && <p className="error-text">{errors?.email?.message}</p>}
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                {...register("username")}
              />
              {errors?.username && <p className="error-text">{errors?.username?.message}</p>}
              <label htmlFor="password">Password</label>
              <div className="form-group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <button
                  data-cy="show-password"
                  className="form-group-icon"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye style={{ fill: "white", stroke: "#FFC700" }} />
                  ) : (
                    <EyeOff style={{ fill: "white", stroke: "#FFC700" }} />
                  )}
                </button>
              </div>
              {errors?.password && <p className="error-text">{errors?.password?.message}</p>}
              <label htmlFor="retypepassword">Confirm Password</label>
              <div className="form-group">
                <input
                  id="retypepassword"
                  type={retypeShowPassword ? "text" : "password"}
                  {...register("retypepassword")}
                />
                <button
                  data-cy="show-retypepassword"
                  className="form-group-icon"
                  type="button"
                  onClick={() => retypesetShowPassword(!retypeShowPassword)}
                >
                  {retypeShowPassword ? (
                    <Eye style={{ fill: "white", stroke: "#FFC700" }} />
                  ) : (
                    <EyeOff style={{ fill: "white", stroke: "#FFC700" }} />
                  )}
                </button>
              </div>
              {errors?.retypepassword && <p className="error-text">{errors?.retypepassword?.message}</p>}
              <button
                className="form-submit"
                type="submit"
                disabled={isSubmitting}
              >
                Register
              </button>
              <p
                className="error-text"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {error}
              </p>
              <div className="form-route-change">
                <p className="form-route-change-p">Already have an account? </p>
                <Link
                  className="form-route-change-link-style"
                  href="/login"
                >
                  Login
                </Link>
              </div>
            </form>
          </>
        </Section>
      </div>
    </main>
  );
}

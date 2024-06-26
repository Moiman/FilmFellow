import { type NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import * as yup from "yup";
import { createUser, findUserByEmail, findUserByUsername } from "@/services/userService";

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
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await registerUserSchema.validate(data, { abortEarly: false });
    const existingEmail = await findUserByEmail(data.email);

    if (existingEmail) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        {
          status: 409,
        },
      );
    }
    const existingUsername = await findUserByUsername(data.username);
    if (existingUsername) {
      return NextResponse.json(
        { error: "User already exists with this username" },
        {
          status: 409,
        },
      );
    }
    const hashedPassword = await argon2.hash(data.password);
    const newUser = await createUser(data.email, data.username, hashedPassword);
    return NextResponse.json(newUser, { status: 200 });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return NextResponse.json({ error: err }, { status: 400 });
    } else {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}

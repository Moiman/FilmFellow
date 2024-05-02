import { type NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import argon2 from "argon2";
import { findUserByEmail, updateUserLastVisited } from "@/services/authService";

const loginUserSchema = yup.object({
  email: yup.string().trim().required("email is required").email("Must be a valid email"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await loginUserSchema.validate(data, { abortEarly: false });

    const existingUser = await findUserByEmail(data.email);
    if (existingUser && (await argon2.verify(existingUser.password, data.password))) {
      const loggedInUser = {
        username: existingUser.username,
        email: existingUser.email,
        id: existingUser.id,
        role: existingUser.role,
      };
      if (existingUser.isActive === false && !existingUser.banDuration) {
        return NextResponse.json({ error: "You are banned forever" }, { status: 401 });
      }
      if (existingUser.isActive === false && existingUser.banDuration) {
        return NextResponse.json({ error: `You are banned until ${existingUser.banDuration}` }, { status: 401 });
      }
      await updateUserLastVisited(existingUser.id, new Date());
      return NextResponse.json(loggedInUser, { status: 200 });
    } else {
      return NextResponse.json({ error: "Credentials doesnt match" }, { status: 400 });
    }
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return NextResponse.json({ error: err }, { status: 400 });
    } else {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}

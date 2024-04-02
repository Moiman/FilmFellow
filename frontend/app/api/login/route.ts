import { findUserByEmail } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import argon2 from "argon2";

const loginUserSchema = yup.object({
  email: yup.string().trim().required("email is required").email("Must be a valid email"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: NextRequest, res: Response) {
  try {
    const data = await req.json();
    console.log(req.cookies.get("next-auth.session-token")?.value);
    // console.log(data);
    await loginUserSchema.validate(data);
    const existingUser = await findUserByEmail(data.email);
    if (existingUser && (await argon2.verify(existingUser.password, data.password))) {
      const loggedInUser = {
        username: existingUser.username,
        email: existingUser.email,
        id: existingUser.id,
        role: existingUser.role,
      };
      return NextResponse.json(loggedInUser, { status: 200 });
    } else {
      return NextResponse.json({ error: "Credentials doesnt match" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

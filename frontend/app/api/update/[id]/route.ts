import { findUserByEmail, findUserById, findUserByUsername, updateUser } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import * as yup from "yup";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

interface Params {
  id: string;
}

const updateUserSchema = yup.object({
  email: yup.string().trim().optional().email("Must be a valid email"),
  username: yup
    .string()
    .trim()
    .optional()
    .min(2, "Username too short, minimum length is 2")
    .max(50, "Username too long, max length is 50"),
  password: yup
    .string()
    .optional()
    .min(6, "Must be at least 6 characters long")
    .matches(/^(?=.*[a-z])/, "Password requires atleast 1 regural character")
    .matches(/^(?=.*[A-Z])/, "Password requires atleast 1 capital character")
    .matches(/^(?=.*[0-9])/, "Password requires atleast 1 number")
    .matches(/^(?=.*[!@#$%^&*])/, "Password requires atleast 1 special character"),
  role: yup.string().optional().oneOf(Object.values(Role), "Role must be either admin, user or moderator"),
});

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const userId = parseInt(params.id);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Not Authorized" },
        {
          status: 400,
        },
      );
    }
    await updateUserSchema.validate(data, { abortEarly: false });
    const { email, username, password, role } = data;
    if (!email && !password && !username && !role) {
      return NextResponse.json(
        { error: "Missing email, password, username or role" },
        {
          status: 400,
        },
      );
    }

    const user = await findUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: `Coundnt find user with id ${userId}` },
        {
          status: 404,
        },
      );
    }

    if ((email && session.user.id === userId) || session.user.role === Role.admin) {
      const foundEmail = await findUserByEmail(email);
      if (foundEmail) {
        return NextResponse.json(
          { error: "User already exists with that email" },
          {
            status: 409,
          },
        );
      }
      user.email = email;
    }
    if ((password && session.user.id === userId) || session.user.role === Role.admin) {
      user.password = await argon2.hash(password);
    }
    if ((username && session.user.id === userId) || session.user.role === Role.admin) {
      const foundUsername = await findUserByUsername(username);
      if (foundUsername) {
        return NextResponse.json(
          { error: "User already exists with that name" },
          {
            status: 409,
          },
        );
      }
      user.username = username;
    }
    if (role) {
      if (user.role !== Role.admin) {
        return NextResponse.json(
          { error: "Cant change user role unless admin" },
          {
            status: 400,
          },
        );
      }
      user.role = role;
    }
    const updatedUser = await updateUser(userId, user);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
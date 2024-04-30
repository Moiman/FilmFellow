import { type NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import * as yup from "yup";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { authOptions } from "@/authOptions";
import {
  changeUserStatusById,
  findUserByEmail,
  findUserById,
  findUserByUsername,
  updateUser,
} from "@/services/authService";

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
  isActive: yup.boolean().optional(),
  banDuration: yup
    .number()
    .nullable()
    .optional()
    .min(86400, "Smallest ban duration is 1 day (86400 seconds)")
    .max(2592000, "Highest ban duration is 30 days (2592000 seconds"),
});

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const data = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Not Authorized" },
        {
          status: 401,
        },
      );
    }

    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "User id not a number" }, { status: 400 });
    }
    if (userId < 1) {
      return NextResponse.json({ error: "User id cant be under 1" }, { status: 400 });
    }
    await updateUserSchema.validate(data, { abortEarly: false });
    const { email, username, password, role, banDuration, isActive } = data;
    if (!email && !password && !username && !role && !banDuration && isActive === undefined) {
      return NextResponse.json(
        { error: "Missing email, password, username, role, banDuration or isActive" },
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
    if (user.role === Role.admin) {
      return NextResponse.json(
        { error: `Cant change other admin details` },
        {
          status: 403,
        },
      );
    }
    if (session.user.role === Role.admin) {
      if (email) {
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
      if (password) {
        user.password = await argon2.hash(password);
      }
      if (username) {
        const foundUsername = await findUserByUsername(username);
        if (foundUsername) {
          return NextResponse.json(
            { error: "User already exists with that username" },
            {
              status: 409,
            },
          );
        }
        user.username = username;
      }
      if (role) {
        user.role = role;
      }
      if (banDuration || isActive !== undefined) {
        await changeUserStatusById(user.id, isActive, banDuration);
      }
      const updatedUser = await updateUser(userId, user);
      return NextResponse.json(updatedUser, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Cant change other user details unless admin" },
        {
          status: 401,
        },
      );
    }
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return NextResponse.json({ error: err }, { status: 400 });
    } else {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}

import { type NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { authOptions } from "@/authOptions";
import { changeUserStatusById, findUserById, updateUser } from "@/services/userService";

const updateUserSchema = yup.object({
  role: yup.string().optional().oneOf(Object.values(Role), "Role must be either admin, user or moderator"),
  isActive: yup.boolean().optional(),
  banDuration: yup
    .number()
    .nullable()
    .optional()
    .min(86400, "Smallest ban duration is 1 day (86400 seconds)")
    .max(2592000, "Highest ban duration is 30 days (2592000 seconds"),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== Role.admin) {
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

    const data = await req.json();
    await updateUserSchema.validate(data, { abortEarly: false });
    const { role, banDuration, isActive } = data as yup.InferType<typeof updateUserSchema>;

    if (!role && banDuration === undefined && isActive === undefined) {
      return NextResponse.json(
        { error: "Missing role, banDuration or isActive" },
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

    if (role) {
      user.role = role;
      const updatedUser = await updateUser(userId, user);
      return NextResponse.json(updatedUser, { status: 200 });
    }

    if (isActive === undefined || (isActive === true && banDuration)) {
      return NextResponse.json({ error: "Faulty values on ban" }, { status: 400 });
    }

    const updatedUser = await changeUserStatusById(user.id, isActive, banDuration);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return NextResponse.json({ error: err }, { status: 400 });
    } else {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}

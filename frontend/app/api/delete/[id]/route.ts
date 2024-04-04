import { authOptions } from "@/authOptions";
import { deleteUserById, findUserById } from "@/services/authService";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const userId = parseInt(params.id);

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Not Authorized" },
        {
          status: 400,
        },
      );
    }

    const existingUser = await findUserById(userId);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (session.user.id === userId || session.user.role === Role.admin) {
      const deletedUser = await deleteUserById(userId);
      return NextResponse.json(deletedUser, { status: 200 });
    } else {
      return NextResponse.json({ error: "Cant delete other users unless admin" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}

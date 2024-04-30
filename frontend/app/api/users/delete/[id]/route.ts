import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/authOptions";
import { deleteUserById, findUserById } from "@/services/authService";

interface Params {
  id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
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
    if (session.user.role === Role.admin) {
      const existingUser = await findUserById(userId);
      if (!existingUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      if(existingUser.role === Role.admin){
        return NextResponse.json({ error: "Cant delete other admins" }, { status: 403 });
      }

      const deletedUser = await deleteUserById(userId);
      return NextResponse.json(deletedUser, { status: 200 });
    } else {
      return NextResponse.json({ error: "Cant delete other users unless admin" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

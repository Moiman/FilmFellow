import { authOptions } from "@/authOptions";
import { deleteUserById } from "@/services/authService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE() {
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
    const deletedUser = await deleteUserById(Number(session.user.id));
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

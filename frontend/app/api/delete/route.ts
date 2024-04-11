import { authOptions } from "@/authOptions";
import { deleteUserById } from "@/services/authService";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Not Authorized" },
        {
          status: 400,
        },
      );
    }
    const deletedUser = await deleteUserById(Number(session.user.id));
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}

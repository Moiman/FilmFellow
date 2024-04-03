import { deleteUserById, findUserById } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  id: string;
};

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const userId = parseInt(params.id);

    const existingUser = await findUserById(userId);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const deletedUser = await deleteUserById(userId);
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err },{status: 400});
  }
}

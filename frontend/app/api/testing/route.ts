import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session) {
      return NextResponse.json(
        { error: "Not Authorized" },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json({ email: session.user.email }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

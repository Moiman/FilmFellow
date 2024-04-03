import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    console.log(req.headers);
    console.log(session);
    console.log(req.cookies.get("next-auth.session-token")?.value);

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

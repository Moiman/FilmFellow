import { type NextRequest, NextResponse } from "next/server";
import { getPersonById } from "@/services/personsService";

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const personId = parseInt(params.id);
    if (isNaN(personId)) {
      return NextResponse.json({ error: "Person id not a number" }, { status: 400 });
    }
    if (personId <= 1) {
      return NextResponse.json({ error: "Person id cant be under 1" }, { status: 400 });
    }
    const result = await getPersonById(personId);
    if (!result) {
      return NextResponse.json({ error: `Person not found with id ${personId}` }, { status: 404 });
    }
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

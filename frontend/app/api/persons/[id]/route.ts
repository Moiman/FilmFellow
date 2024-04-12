import { getPersonById } from "@/services/personsService";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const personId = parseInt(params.id);
    const result = await getPersonById(personId);
    if (!result) {
      return NextResponse.json({ error: `Person not found with id ${personId}` }, { status: 404 });
    }
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

import { getMovieById } from "@/services/movieService";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const movieId = parseInt(params.id);
    const result = await getMovieById(movieId);
    if (!result) {
      return NextResponse.json({ error: `Movie not found with id ${movieId}` }, { status: 404 });
    }
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
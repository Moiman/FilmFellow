import { getMovieReviewsById } from "@/services/movieService";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const movieId = parseInt(params.id);
    const result = await getMovieReviewsById(movieId);
    if (result.length === 0) {
      return NextResponse.json({ error: `Movie not found with id ${movieId}` }, { status: 404 });
    }
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 400 });
  }
}

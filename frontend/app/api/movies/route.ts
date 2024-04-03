import { getMovieByLimitTypeGenre } from "@/services/movieService";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const requestQuerySchema = yup.object({
  limit: yup.number().positive().integer().required().max(50),
  type: yup
    .string()
    .required()
    .matches(/[a-zA-Z]+/g, "Only letters allowed"),
  genre: yup
    .string()
    .required()
    .matches(/[a-zA-Z]+/g, "Only letters allowed"),
});

export async function GET(req: NextRequest) {
  try {
    const limit = req.nextUrl.searchParams.get("limit");
    const type = req.nextUrl.searchParams.get("type");
    const genre = req.nextUrl.searchParams.get("genre");
    const validationObj = {
      limit: limit,
      type: type,
      genre: genre,
    };
    await requestQuerySchema.validate(validationObj, { abortEarly: false });

    const result = await getMovieByLimitTypeGenre(parseInt(limit!), type!, genre!);
    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Movies not found" }, { status: 404 });
    }
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}

import { Router } from "express";
import * as yup from "yup";
import { validateReqQuery } from "../middlewares/validate.js";
import { getMovieById, getMovieReviewsById, getMovieByLimitTypeGenre } from "../services/movieService.js";

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

const movieRouter = Router();
//?limit=10&type=new&genre=horror
movieRouter.get("/", validateReqQuery(requestQuerySchema), async (req, res, next) => {
  try {
    const { limit, type, genre } = req.query as { limit: string; type: string; genre: string };
    const result = await getMovieByLimitTypeGenre(parseInt(limit), type, genre);
    if (!result || result.length === 0) {
      return res.status(404).json({ error: `Movies not found` });
    }
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

movieRouter.get("/:movieId(\\d+)", async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const result = await getMovieById(movieId);
    if (!result) {
      return res.status(404).json({ error: `Movie not found with id ${movieId}` });
    }
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

movieRouter.get("/:movieId/reviews", async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const result = await getMovieReviewsById(movieId);
    if (result.length === 0) {
      return res.status(404).json({ error: `Movie not found with id ${movieId}` });
    }
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default movieRouter;

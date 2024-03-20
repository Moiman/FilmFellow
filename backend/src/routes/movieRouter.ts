import { Router } from "express";
import * as yup from "yup";
import validate from "../middlewares/validate.js";
import { getMovieById, getMovieReviewsById, getMovieByLimitTypeGenre } from "../services/movieService.js";

const requestQuerySchema = yup.object({
  limit: yup.number().positive().integer().required(),
  type: yup.string().required(),
  genre: yup.string().required(),
});

const movieRouter = Router();
//?limit=10&type=new&genre=horror
movieRouter.get("/", validate.validateReqQuery(requestQuerySchema), async (req, res, next) => {
  try {
    const { limit, type, genre } = req.query as { limit: string; type: string; genre: string };
    console.log(limit, type, genre);
    const result = await getMovieByLimitTypeGenre(parseInt(limit), type, genre);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

movieRouter.get("/:movieId(\\d+)", async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.movieId);
    console.log(movieId);
    const result = await getMovieById(movieId);
    if (!result) {
      return res.status(404).json({ error: `movie not found with id ${movieId}` });
    }
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

movieRouter.get("/:movieId/reviews", async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.movieId);
    console.log(movieId);
    const result = await getMovieReviewsById(movieId);
    if (result.length === 0) {
      return res.status(404).json({ error: `movie not found with id ${movieId}` });
    }
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default movieRouter;

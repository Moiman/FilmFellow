import { Router } from "express";
import { getPersonById } from "../services/personsService.js";

const personsRouter = Router();

personsRouter.get("/:personId(\\d+)", async (req, res, next) => {
  try {
    const personId = parseInt(req.params.personId);
    const result = await getPersonById(personId);
    if (!result) {
      return res.status(404).json({ error: `Person not found with id ${personId}` });
    }
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default personsRouter;

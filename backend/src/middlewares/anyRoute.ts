import { Request, Response } from "express";

export const anyRoute = (req: Request, res: Response) => {
  res.status(404).json({ error: `Unknown Route ${req.path}` });
};

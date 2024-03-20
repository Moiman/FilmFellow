import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import { anyRoute } from "./middlewares/anyRoute.js";
import movieRouter from "./routes/movieRouter.js";

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/movies", movieRouter);
app.use(anyRoute);

export default app;

import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

export default app;

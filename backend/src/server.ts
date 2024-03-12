import express from "express";
import cors from "cors";
import usersRouter from "./routes/userRouter.js";

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);

export default app;

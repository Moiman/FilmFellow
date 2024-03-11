import express from "express";
import cors from "cors";

const PORT = process.env.BACKEND_PORT!;
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
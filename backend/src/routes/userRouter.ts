import { Router } from "express";
import { createUser } from "../services/userService.js";
import argon2 from "argon2";

const usersRouter = Router();

interface User {
    email: string
    username: string
    password: string
    birthDate: string
}

usersRouter.post(
  "/createuser",
  async (req, res, next) => {
    try {
      const { email, username, password, birthDate } = req.body as User;

      const birthDateAsDate = new Date(birthDate);

      const hashedPassword = await argon2.hash(password);
      const newUser = await createUser(email, username, hashedPassword, birthDateAsDate);
      return res.status(200).json(newUser);
    } catch (err) {
      next(err);
    }
  },
);

export default usersRouter;

import { Router } from "express";
import argon2 from "argon2";
import * as yup from "yup";
import { createUser } from "../services/authService.js";
import validate from "../middlewares/validate.js";
import type { RequestBody } from "../types/types.js";

const authRouter = Router();

const registerUserSchema = yup.object({
  email: yup.string().trim().required("email is required").email("Must be a valid email"),
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(2, "Username too short, minimum length is 2")
    .max(50, "Username too long, max length is 50"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Must be at least 6 characters long")
    .matches(/^(?=.*[a-z])/, "Password requires atleast 1 regural character")
    .matches(/^(?=.*[A-Z])/, "Password requires atleast 1 capital character")
    .matches(/^(?=.*[0-9])/, "Password requires atleast 1 number")
    .matches(/^(?=.*[!@#$%^&*])/, "Password requires atleast 1 special character"),
});
type RegisterUserSchemaType = yup.InferType<typeof registerUserSchema>;

authRouter.post(
  "/register",
  validate(registerUserSchema),
  async (req: RequestBody<RegisterUserSchemaType>, res, next) => {
    try {
      const { email, username, password } = req.body;

      const hashedPassword = await argon2.hash(password);
      const newUser = await createUser(email, username, hashedPassword);
      return res.status(200).json(newUser);
    } catch (err) {
      next(err);
    }
  },
);

export default authRouter;

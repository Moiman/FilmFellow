import { Router } from "express";
import { createUser } from "../services/userService.js";
import argon2 from "argon2";
import * as yup from "yup";
import validate from "../middlewares/validate.js";
import { RequestBody } from "../types/types.js";
const usersRouter = Router();

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
  birthDate: yup.string().required("Birthdate is required"),
});
type RegisterUserSchemaType = yup.InferType<typeof registerUserSchema>;

usersRouter.post(
  "/createuser",
  validate(registerUserSchema),
  async (req: RequestBody<RegisterUserSchemaType>, res, next) => {
    try {
      const { email, username, password, birthDate } = req.body;

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

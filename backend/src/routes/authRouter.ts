import { Router } from "express";
import argon2 from "argon2";
import * as yup from "yup";
import {
  createUser,
  findUserByEmail,
  findUserById,
  deleteUserById,
  findUserByUsername,
  updateUser,
} from "../services/authService.js";
import { validate } from "../middlewares/validate.js";
import type { RequestBody } from "../types/types.js";
import { Role } from "@prisma/client";

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

const loginUserSchema = yup.object({
  email: yup.string().trim().required("email is required").email("Must be a valid email"),
  password: yup.string().required("Password is required").min(6, "Must be at least 6 characters long"),
});
type LoginUserSchemaType = yup.InferType<typeof loginUserSchema>;

const updateUserSchema = yup.object({
  email: yup.string().trim().optional().email("Must be a valid email"),
  username: yup
    .string()
    .trim()
    .optional()
    .min(2, "Username too short, minimum length is 2")
    .max(50, "Username too long, max length is 50"),
  password: yup
    .string()
    .optional()
    .min(6, "Must be at least 6 characters long")
    .matches(/^(?=.*[a-z])/, "Password requires atleast 1 regural character")
    .matches(/^(?=.*[A-Z])/, "Password requires atleast 1 capital character")
    .matches(/^(?=.*[0-9])/, "Password requires atleast 1 number")
    .matches(/^(?=.*[!@#$%^&*])/, "Password requires atleast 1 special character"),
  role: yup.string().optional().oneOf(Object.values(Role), "Role must be either admin, user or moderator"),
});
type UpdateUserSchemaType = yup.InferType<typeof updateUserSchema>;
authRouter.post(
  "/register",
  validate(registerUserSchema),
  async (req: RequestBody<RegisterUserSchemaType>, res, next) => {
    try {
      const { email, username, password } = req.body;
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "User already exists with that email" });
      }
      const hashedPassword = await argon2.hash(password);
      const newUser = await createUser(email, username, hashedPassword);
      return res.status(200).json(newUser);
    } catch (err) {
      next(err);
    }
  },
);

authRouter.post("/login", validate(loginUserSchema), async (req: RequestBody<LoginUserSchemaType>, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser && (await argon2.verify(existingUser.password, password))) {
      return res.status(200).json(existingUser);
    } else {
      return res.status(400).json({ error: "Credentials doesnt match" });
    }
  } catch (err) {
    next(err);
  }
});

authRouter.put(
  "/update/:userId(\\d+)",
  validate(updateUserSchema),
  async (req: RequestBody<UpdateUserSchemaType>, res, next) => {
    try {
      const userId = parseInt(req.params.userId);
      const { email, username, password, role } = req.body;
      if (!email && !password && !username && !role) {
        return res.status(400).json({ error: "Missing email, password, username or role" });
      }

      const user = await findUserById(userId);
      if (!user) {
        return res.status(404).json({ error: `Couldn't find user with id ${userId}` });
      }

      if (email) {
        const foundEmail = await findUserByEmail(email);
        if (foundEmail) {
          return res.status(409).json({
            error: "User already exists with that email",
          });
        }
        user.email = email;
      }
      if (password) {
        user.password = await argon2.hash(password);
      }
      if (username) {
        const foundUsername = await findUserByUsername(username);
        if (foundUsername) {
          return res.status(409).json({
            error: "User already exists with that username",
          });
        }
        user.username = username;
      }
      if (role) {
        user.role = role;
      }
      const updatedUser = await updateUser(userId, user);
      return res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  },
);

authRouter.delete("/delete/:userId(\\d+)", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const existingUser = await findUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const deletedUser = await deleteUserById(userId);
    return res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
});

export default authRouter;

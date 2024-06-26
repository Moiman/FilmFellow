import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import argon2 from "argon2";
import prisma from "@/db";
import { Role } from "@prisma/client";

const createAdmin = async () => {
  try {
    const rl = readline.createInterface({ input, output });

    const username = await rl.question("username: ");
    const email = await rl.question("email: ");
    const password = await rl.question("password: ");

    rl.close();

    const existingUser = await prisma.users.findFirst({
      where: { OR: [{ email: { equals: email } }, { username: { equals: username } }] },
    });

    if (!existingUser) {
      const createdAdmin = await prisma.users.create({
        data: {
          username,
          email,
          password: await argon2.hash(password),
          role: Role.admin,
        },
      });
      console.log("Admin account", createdAdmin.username, createdAdmin.email, "created successfully");
    } else {
      console.error("username or email is already in use for user", existingUser.username);
    }
  } catch (error) {
    console.error(error);
  }
};
createAdmin();

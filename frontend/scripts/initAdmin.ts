import argon2 from "argon2";
import { PrismaClient, Role } from "@prisma/client";

const initAdmin = async () => {
  try {
    const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.log("Missing env variables");
      return;
    }
    const admin = {
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: Role.admin,
    };
    const prisma = new PrismaClient();

    const existingUser = await prisma.users.findFirst({
      where: { OR: [{ email: { equals: admin.email } }, { username: { equals: admin.username } }] },
    });

    if (!existingUser) {
      const createdAdmin = await prisma.users.create({
        data: {
          username: admin.username,
          email: admin.email,
          password: await argon2.hash(admin.password),
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
initAdmin();

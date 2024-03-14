import { PrismaClient } from "@prisma/client";
import { Role } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

const initAdmin = async () => {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_USERNAME || !process.env.ADMIN_EMAIL) {
    return "Check env variables";
  }
  const existingAdmin = await prisma.users.findUnique({
    where: { email: process.env.ADMIN_EMAIL },
  });

  if (!existingAdmin) {
    const createdAdmin = await prisma.users.create({
      data: {
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: await argon2.hash(process.env.ADMIN_PASSWORD),
        role: Role.admin,
      },
    });
    return createdAdmin;
  } else {
    return "Admin already initialized";
  }
};

const result = await initAdmin();
console.log(result);

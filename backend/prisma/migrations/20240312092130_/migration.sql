-- CreateEnum
CREATE TYPE "Role" AS ENUM ('viewer', 'manager', 'editor');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordhash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "friends" JSONB[],

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

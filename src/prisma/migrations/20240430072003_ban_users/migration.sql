/*
  Warnings:

  - Added the required column `isActive` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_visited` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "banDuration" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "last_visited" TIMESTAMP(3) NOT NULL;

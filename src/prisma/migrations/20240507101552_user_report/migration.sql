/*
  Warnings:

  - You are about to drop the column `userId` on the `Reports` table. All the data in the column will be lost.
  - Added the required column `creator` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reports" DROP CONSTRAINT "Reports_userId_fkey";

-- AlterTable
ALTER TABLE "Reports" DROP COLUMN "userId",
ADD COLUMN     "creator" INTEGER NOT NULL,
ADD COLUMN     "targetUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

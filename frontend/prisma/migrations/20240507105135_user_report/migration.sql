/*
  Warnings:

  - You are about to drop the column `creator` on the `Reports` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reports" DROP COLUMN "creator",
ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

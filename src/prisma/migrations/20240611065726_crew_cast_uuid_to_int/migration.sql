/*
  Warnings:

  - The primary key for the `MovieCast` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MovieCrew` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "MovieCast" DROP CONSTRAINT "MovieCast_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MovieCast_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MovieCrew" DROP CONSTRAINT "MovieCrew_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MovieCrew_pkey" PRIMARY KEY ("id");

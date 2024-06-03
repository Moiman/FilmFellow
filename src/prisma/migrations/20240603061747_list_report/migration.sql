-- AlterTable
ALTER TABLE "Reports" ADD COLUMN     "listId" INTEGER;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_listId_fkey" FOREIGN KEY ("listId") REFERENCES "Lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

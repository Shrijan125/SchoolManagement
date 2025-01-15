/*
  Warnings:

  - Added the required column `sessionID` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "sessionID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

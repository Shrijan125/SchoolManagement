/*
  Warnings:

  - Added the required column `section` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Made the column `gradeId` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_gradeId_fkey";

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "section" "SECTION" NOT NULL,
ALTER COLUMN "gradeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NurResult" DROP CONSTRAINT "NurResult_studentID_fkey";

-- DropForeignKey
ALTER TABLE "PriResult" DROP CONSTRAINT "PriResult_studentID_fkey";

-- DropForeignKey
ALTER TABLE "SecResult" DROP CONSTRAINT "SecResult_studentID_fkey";

-- DropIndex
DROP INDEX "Student_rollNO_key";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("rollNO");

-- AddForeignKey
ALTER TABLE "NurResult" ADD CONSTRAINT "NurResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("rollNO") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriResult" ADD CONSTRAINT "PriResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("rollNO") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecResult" ADD CONSTRAINT "SecResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("rollNO") ON DELETE RESTRICT ON UPDATE CASCADE;

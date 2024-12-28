/*
  Warnings:

  - A unique constraint covering the columns `[rollNO]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_rollNO_key" ON "Student"("rollNO");

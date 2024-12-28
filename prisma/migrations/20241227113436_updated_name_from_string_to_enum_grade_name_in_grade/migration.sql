/*
  Warnings:

  - Changed the type of `name` on the `Grade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "name",
ADD COLUMN     "name" "GradeName" NOT NULL;

-- CreateEnum
CREATE TYPE "GradeName" AS ENUM ('NUR', 'KG1', 'KG2', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X');

-- CreateEnum
CREATE TYPE "CATEGORYNAME" AS ENUM ('NURSERY', 'PRIMARY', 'SECONDARY');

-- CreateEnum
CREATE TYPE "SECTION" AS ENUM ('A', 'B');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('TEACHER', 'ADMIN');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" "CATEGORYNAME" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryID" TEXT NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryID" TEXT NOT NULL,
    "totalMarks" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gradeID" TEXT NOT NULL,
    "rollNO" TEXT NOT NULL,
    "Section" "SECTION" NOT NULL,
    "serialNO" TEXT NOT NULL,
    "sessionID" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NurResult" (
    "id" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "sessionID" TEXT NOT NULL,
    "examID" TEXT NOT NULL,
    "englishwritten" INTEGER NOT NULL DEFAULT -1,
    "englishoral" INTEGER NOT NULL DEFAULT -1,
    "englishrhymes" INTEGER NOT NULL DEFAULT -1,
    "hindiwritten" INTEGER NOT NULL DEFAULT -1,
    "hindioral" INTEGER NOT NULL DEFAULT -1,
    "hindirhymes" INTEGER NOT NULL DEFAULT -1,
    "mathswritten" INTEGER NOT NULL DEFAULT -1,
    "mathsoral" INTEGER NOT NULL DEFAULT -1,
    "gs" INTEGER NOT NULL DEFAULT -1,
    "activity" INTEGER NOT NULL DEFAULT -1,
    "spelldict" INTEGER NOT NULL DEFAULT -1,
    "drawing" INTEGER NOT NULL DEFAULT -1,
    "pt" INTEGER NOT NULL DEFAULT -1,
    "conversation" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "NurResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriResult" (
    "id" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "sessionID" TEXT NOT NULL,
    "examID" TEXT NOT NULL,
    "english" INTEGER NOT NULL DEFAULT -1,
    "hindi" INTEGER NOT NULL DEFAULT -1,
    "maths" INTEGER NOT NULL DEFAULT -1,
    "science" INTEGER NOT NULL DEFAULT -1,
    "sst" INTEGER NOT NULL DEFAULT -1,
    "computer" INTEGER NOT NULL DEFAULT -1,
    "gk" INTEGER NOT NULL DEFAULT -1,
    "valueedu" INTEGER NOT NULL DEFAULT -1,
    "sanskrit" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "PriResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecResult" (
    "id" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "sessionID" TEXT NOT NULL,
    "examID" TEXT NOT NULL,
    "english" INTEGER NOT NULL DEFAULT -1,
    "hindi" INTEGER NOT NULL DEFAULT -1,
    "maths" INTEGER NOT NULL DEFAULT -1,
    "science" INTEGER NOT NULL DEFAULT -1,
    "sst" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "SecResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gradeId" TEXT,
    "role" "ROLE" NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_name_key" ON "Session"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_gradeID_fkey" FOREIGN KEY ("gradeID") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NurResult" ADD CONSTRAINT "NurResult_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NurResult" ADD CONSTRAINT "NurResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NurResult" ADD CONSTRAINT "NurResult_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriResult" ADD CONSTRAINT "PriResult_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriResult" ADD CONSTRAINT "PriResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriResult" ADD CONSTRAINT "PriResult_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecResult" ADD CONSTRAINT "SecResult_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecResult" ADD CONSTRAINT "SecResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecResult" ADD CONSTRAINT "SecResult_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

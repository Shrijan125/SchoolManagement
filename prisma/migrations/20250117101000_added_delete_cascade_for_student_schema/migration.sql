-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_rollNO_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_rollNO_fkey";

-- DropForeignKey
ALTER TABLE "NurResult" DROP CONSTRAINT "NurResult_studentID_fkey";

-- DropForeignKey
ALTER TABLE "PriResult" DROP CONSTRAINT "PriResult_studentID_fkey";

-- DropForeignKey
ALTER TABLE "SecResult" DROP CONSTRAINT "SecResult_studentID_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "alternatePhone" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "NurResult" ADD CONSTRAINT "NurResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("rollNO") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriResult" ADD CONSTRAINT "PriResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("rollNO") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecResult" ADD CONSTRAINT "SecResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("rollNO") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_rollNO_fkey" FOREIGN KEY ("rollNO") REFERENCES "Student"("rollNO") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_rollNO_fkey" FOREIGN KEY ("rollNO") REFERENCES "Student"("rollNO") ON DELETE CASCADE ON UPDATE CASCADE;

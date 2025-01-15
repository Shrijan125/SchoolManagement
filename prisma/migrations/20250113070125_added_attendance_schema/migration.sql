-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "rollNO" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_rollNO_fkey" FOREIGN KEY ("rollNO") REFERENCES "Student"("rollNO") ON DELETE RESTRICT ON UPDATE CASCADE;

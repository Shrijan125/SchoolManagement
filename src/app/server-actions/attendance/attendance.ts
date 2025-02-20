'use server';
import { authOptions } from '@/lib/auth';
import { firebaseAdmin } from '@/lib/firebase-admin';
import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
import { getServerSession } from 'next-auth';
const prisma = new PrismaClient();

export async function markAttendance({
  grade,
  section,
  students,
}: {
  grade: string;
  section: string;
  students: string[];
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) return { error: 'Unauthorised!' };

  if (!grade || !section || !students || students.length === 0) {
    return { error: 'All fields are required' };
  }

  try {
    const attendanceRecords = students.map((rollNO) => ({
      rollNO,
      date: new Date(),
    }));

    const studentDetails = await prisma.student.findMany({
      where: {
        rollNO: {
          in: students,
        },
      },
      select: {
        rollNO: true,
        fcmToken: true,
        name: true,
      },
    });

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    const notificatiionsRecords = studentDetails.map((student) => ({
      rollNO: student.rollNO,
      body: `Your ward ${student.name} is absent today. Please contact the school if not so.`,
      title: `Absent ${formattedDate}`,
    }));

    await prisma.$transaction(async (prisma) => {
      await prisma.attendance.createMany({
        data: attendanceRecords,
      });
      await prisma.notifications.createMany({
        data: notificatiionsRecords,
      });
    });

    studentDetails.forEach(async (student) => {
      if (student?.fcmToken) {
        const payload: admin.messaging.Message = {
          notification: {
            title: 'Akshar Vidya Griha',
            body: `Your Ward ${student?.name} is absent today`,
          },
          android: {
            notification: {
              channelId: '1',
              priority: 'high' as const,
              defaultSound: true,
              visibility: 'public',
            },
          },
          token: student?.fcmToken,
        };

        firebaseAdmin
          .messaging()
          .send(payload)
          .then((_) => {
            console.log('Notification sent successfully:');
          })
          .catch((error) => {
            console.log('Error sending notification:', error);
          });
      }
    });
    return { success: 'Attendance Marked successfully!' };
  } catch (error) {
    console.log(error);
    return { error: 'Error while marking attendance' };
  }
}

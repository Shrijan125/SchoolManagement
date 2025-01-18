'use server';

import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { SECTION } from '@prisma/client';
import { getServerSession } from 'next-auth';

type StudentSection = { rollNO: string; Section: SECTION };

export async function getStudentsCountByCategrory() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { error: 'Unauthorized!' };
  }

  try {
    const studentCountByCategory = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        grades: {
          select: {
            _count: {
              select: {
                student: true,
              },
            },
          },
        },
      },
    });
    const formattedResults = studentCountByCategory.map((category) => ({
      categoryName: category.name,
      totalStudents: category.grades.reduce(
        (acc, grade) => acc + grade._count.student,
        0,
      ),
    }));
    return { data: formattedResults };
  } catch (error) {
    return { error: 'Failed to fetch students count' };
  }
}

export async function getAbsentStudents() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { error: 'Unauthorized!' };
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const presentStudents = await prisma.attendance.groupBy({
      by: ['rollNO'],
      where: {
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    const presentStudentRollNos = new Set(presentStudents.map((p) => p.rollNO));

    const gradeWiseCount = await prisma.grade.findMany({
      select: {
        name: true,
        student: {
          select: {
            rollNO: true,
            Section: true,
          },
        },
      },
    });

    const data = gradeWiseCount.flatMap((grade) => {
        // Define the sections object with the correct type
        const sections: { A: StudentSection[]; B: StudentSection[] } = { A: [], B: [] };
  
        // Group students by Section (A or B)
        grade.student.forEach((student) => {
          sections[student.Section].push(student);
        });
  
        return ['A', 'B'].map((section) => {
          const sectionStudents = sections[section as SECTION];
          const absentCount = sectionStudents.filter((s) =>
            presentStudentRollNos.has(s.rollNO),
          ).length;
          const presentCount = sectionStudents.length - absentCount;
  
          return {
            gradeName: `${grade.name}-${section}`,
            totalStudents: sectionStudents.length,
            presentStudents: presentCount,
            absentStudents: absentCount,
          };
        });
      });
    return { data };
  } catch (error) {
    return { error: 'Failed to fetch absent students' };
  }
}

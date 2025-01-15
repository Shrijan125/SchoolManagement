'use server';

import { StudentData } from '@/components/forms/bulk-student-form';
import prisma from '@/db';
import { GradeName, SECTION } from '@prisma/client';

export async function addStudent({
  name,
  grade,
  section,
  serialNO,
  rollNO,
}: {
  name: string;
  grade: string;
  section: string;
  serialNO: string;
  rollNO: string;
}) {
  if (!name || !grade || !section || !serialNO || !rollNO) {
    return { error: 'All fields are required' };
  }
  try {
    const gradeId = await prisma.grade.findFirst({
      where: {
        name: grade as GradeName,
      },
      select: {
        id: true,
      },
    });
    if (!gradeId) {
      return { error: 'Grade not found' };
    }
    await prisma.student.create({
      data: {
        name,
        gradeID: gradeId?.id,
        sessionID: process.env.NEXTSESSION_ID as string,
        Section: section as SECTION,
        serialNO: serialNO,
        rollNO: rollNO,
      },
    });
    return { success: 'Student added successfully' };
  } catch (error) {
    return { error: 'Error while adding student' };
  }
}

export async function addbulkStudent({
  grade,
  section,
  students,
}: {
  grade: string;
  section: string;
  students: StudentData[];
}) {
  if (!grade || !section || !students || students.length === 0) {
    return { error: 'All fields are required' };
  }
  console.log(grade, section, students);
  try {
    const gradeId = await prisma.grade.findFirst({
      where: {
        name: grade as GradeName,
      },
      select: {
        id: true,
      },
    });
    if (!gradeId) {
      return { error: 'Grade not found' };
    }
    await prisma.student.createMany({
      data: students.map((student) => ({
        name: student.name,
        gradeID: gradeId?.id,
        sessionID: process.env.NEXTSESSION_ID as string,
        Section: section as SECTION,
        serialNO: student.serialNO,
        rollNO: student.rollNO,
      })),
    });
    return { success: 'Students added successfully' };
  } catch (error) {
    return { error: 'Error while adding students' };
  }
}

export async function getStudentbySection({
  grade,
  section,
}: {
  grade: string;
  section: string;
}) {
  if (!grade || !section) {
    return { error: 'All fields are required' };
  }
  try {
    const gradeId = await prisma.grade.findFirst({
      where: {
        name: grade as GradeName,
      },
      select: {
        id: true,
      },
    });
    if (!gradeId) {
      return { error: 'Grade not found' };
    }
    const students = await prisma.student.findMany({
      where: {
        gradeID: gradeId?.id,
        Section: section as SECTION,
      },
      select: {
        name: true,
        serialNO: true,
        rollNO: true,
      },
    });
    return { students };
  } catch (error) {
    return { error: 'Error while fetching students' };
  }
}

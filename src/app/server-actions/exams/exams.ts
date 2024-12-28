'use server';

import prisma from '@/db';
import { GradeName } from '@prisma/client';

export default async function getExamsByGrades({ grade }: { grade: string }) {
  if (!grade) return { error: 'Grade is required' };
  try {
    const gradeCategoryId = await prisma.grade.findFirst({
      where: {
        name: grade as GradeName,
      },
      select: {
        categoryID: true,
      },
    });
    if (!gradeCategoryId) return { error: 'Grade not found' };

    const exams = await prisma.exam.findMany({
      where: {
        categoryID: gradeCategoryId.categoryID,
      },
    });
    return { data: exams };
  } catch (error) {
    return { error: 'Failed to fetch Grades' };
  }
}

'use server';
import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import {
  createAssignmentFormSchema,
  CreateAssignmentSchema,
} from '@/lib/schemas/assignment-schema';
import { GradeName, SECTION } from '@prisma/client';
import { getServerSession } from 'next-auth';

export async function createAssignment(input: CreateAssignmentSchema) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) return { error: 'Unauthorised!' };

  const validationResult = createAssignmentFormSchema.safeParse(input);

  if (!validationResult.success) {
    return { error: 'Invalid input data' };
  }
  const { grade, section, subjects } = validationResult.data;
  try {
    const gradeID = await prisma.grade.findFirst({
      where: {
        name: grade as GradeName,
      },
      select: {
        id: true,
      },
    });
    if (!gradeID) {
      return { error: 'Invalid Grade' };
    }
    const assignmentData = subjects.map((subject) => {
      return {
        gradeId: gradeID.id,
        section: section as SECTION,
        sessionID: process.env.NEXTSESSION_ID as string,
        subject: subject.subjectName,
        assignment: subject.subjectTask,
      };
    });

    await prisma.$transaction(async (prisma) => {
      await prisma.assignment.createMany({
        data: assignmentData,
      });
    });
    return { success: 'Assignment created successfully' };
  } catch (error) {
    console.log(error);
    return { error: 'Error while creating assignment' };
  }
}

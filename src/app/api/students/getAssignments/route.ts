import prisma from '@/db';
import { authenticateStudent } from '@/lib/student_login';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const student = await authenticateStudent(req.headers.get('Authorization'));

    const students = await prisma.student.findMany({
      where: {
        phone: student.phone,
      },
      select: {
        grade: true,
        gradeID: true,
        name: true,
      },
    });

    const gradeAssignments = [];

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    const nextDay = new Date(today);
    const endOfRange = new Date(nextDay.setDate(nextDay.getDate() + 1));
    endOfRange.setHours(9, 0, 0, 0);

    for (const student of students) {
      const assignments = await prisma.assignment.findMany({
        where: {
          gradeId: student.gradeID,
          createdAt: {
            gte: startOfDay,
            lte: endOfRange,
          },
        },
        select: {
          subject: true,
          assignment: true,
        },
      });
      gradeAssignments.push({
        grade: student.grade.name,
        gradeID: student.gradeID,
        name: student.name,
        assignments,
      });
    }

    return NextResponse.json({ gradeAssignments }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Token expired') {
        return Response.json('Token Expired', { status: 401 });
      }
      if (
        error.message === 'No token provided' ||
        error.message === 'Invalid token' ||
        error.message === 'Invalid user'
      ) {
        return Response.json(error.message, { status: 400 });
      }
    }
    return Response.json('Unauthorised!', { status: 401 });
  }
}

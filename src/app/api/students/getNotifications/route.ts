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
        rollNO: true,
      },
    });

    const rollNumbers = students.map((student) => student.rollNO);

    const notifications = await prisma.notifications.findMany({
      where: {
        rollNO: { in: rollNumbers },
      },
    });

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Token expired') {
        return Response.json({ error: 'Token expired' }, { status: 401 });
      }
      if (
        error.message === 'No token provided' ||
        error.message === 'Invalid token' ||
        error.message === 'Invalid user'
      ) {
        return Response.json({ error: error.message }, { status: 400 });
      }
    }
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }
}

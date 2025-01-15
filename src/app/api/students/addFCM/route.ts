import prisma from '@/db';
import { authenticateStudent } from '@/lib/student_login';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestBodySchema = z.object({
  fcmtoken: z.string(),
});

export async function PUT(req: NextRequest) {
  try {
    const student = await authenticateStudent(req.headers.get('Authorization'));
    const parseResult = requestBodySchema.safeParse(await req.json());

    if (!parseResult.success) {
      return NextResponse.json('Failed to parse request body!', {
        status: 400,
      });
    }

    const { fcmtoken } = parseResult.data;

    await prisma.student.updateMany({
      where: {
        phone: student.phone,
      },
      data: {
        fcmToken: fcmtoken,
      },
    });
    return NextResponse.json('FCM Token added successfully', { status: 200 });
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

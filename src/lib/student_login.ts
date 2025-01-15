import { jwtVerify } from 'jose';
import { JOSEError } from 'jose/errors';
import prisma from '@/db';

export async function authenticateStudent(authHeader?: string | null) {
  try {
    const token = authHeader?.split(' ')[1]?.trim();

    if (!token) {
      throw new Error('No token provided');
    }

    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const student = await prisma.student.findFirst({
      where: {
        rollNO: payload.rollNo as string,
      },
    });

    if (!student) {
      throw new Error('Invalid user');
    }

    return student;
  } catch (error) {
    if (error instanceof JOSEError) {
      if (error.code === 'ERR_JWT_EXPIRED') {
        throw new Error('Token expired');
      } else if (error.code === 'ERR_JWT_MALFORMED') {
        throw new Error('Invalid token');
      }
    }
    throw error;
  }
}

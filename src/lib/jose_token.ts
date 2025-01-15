import prisma from '@/db';
import { Student } from '@prisma/client';
import { SignJWT } from 'jose';

export async function generateAccessToken(student: Student) {
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

  return await new SignJWT({ rollNo: student.rollNO })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(process.env.ACCESS_TOKEN_EXPIRY || '1h')
    .sign(secret);
}

export async function generateRefreshToken(student: Student) {
  const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
  return await new SignJWT({ rollNo: student.rollNO })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(process.env.REFRESH_TOKEN_EXPIRY || '7d')
    .sign(secret);
}

export async function generateAccessAndRefreshToken(rollNo: string) {
  try {
    const student = await prisma.student.findFirst({
      where: {
        rollNO: rollNo,
      },
    });
    if (!student) {
      throw new Error('Student not found');
    }
    const accessToken = await generateAccessToken(student);
    const refreshToken = await generateRefreshToken(student);

    await prisma.student.update({
      where: {
        rollNO: rollNo,
      },
      data: {
        refrehToken: refreshToken,
      },
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/db';
import { generateAccessAndRefreshToken } from '@/lib/jose_token';
import { jwtVerify } from 'jose';
import { JOSEError } from 'jose/errors';

const requestBodySchema = z.object({
  refreshToken: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const parseResult = requestBodySchema.safeParse(await req.json());

    if (!parseResult.success) {
      return NextResponse.json('Failed to parse request body!', {
        status: 400,
      });
    }

    const { refreshToken } = parseResult.data;
    const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
    const { payload } = (await jwtVerify(refreshToken, secret)) as {
      payload: { rollNo: string };
    };

    if (!payload.rollNo || typeof payload.rollNo !== 'string') {
      return NextResponse.json('Invalid Refresh token!', { status: 400 });
    }

    const student = await prisma.student.findFirst({
      where: {
        rollNO: payload.rollNo,
      },
    });

    if (!student) {
      return NextResponse.json('Invalid Refresh token!', { status: 400 });
    }

    if (refreshToken !== student.refrehToken) {
      console.log('Refresh token mismatch!');
      return NextResponse.json('Refresh token mismatch!', { status: 401 });
    }

    const token = await generateAccessAndRefreshToken(payload.rollNo);

    return NextResponse.json(
      { accessToken: token.accessToken, refreshToken: token.refreshToken },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    if (error instanceof JOSEError && error.code === 'ERR_JWT_EXPIRED') {
      return NextResponse.json('Refresh token expired', { status: 401 });
    }
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}

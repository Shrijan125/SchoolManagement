import prisma from '@/db';
import { generateAccessAndRefreshToken } from '@/lib/jose_token';
import { CATEGORYNAME, GradeName } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestBodySchema = z.object({
  phone: z.string().length(10),
  password: z.string(),
  grade: z.string(),
  rollNo: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const parseResult = requestBodySchema.safeParse(await req.json());

    if (!parseResult.success) {
      return NextResponse.json('Failed to parse request body!', {
        status: 400,
      });
    }

    const { phone, password, grade, rollNo } = parseResult.data;

    const gradeDetails = await prisma.grade.findFirst({
      where: {
        name: grade as GradeName,
      },
    });

    const nurcategoryId = await prisma.category.findFirst({
      where: {
        name: CATEGORYNAME.NURSERY,
      },
    });

    const isInNursery = gradeDetails?.categoryID === nurcategoryId?.id;

    if (!gradeDetails) {
      return NextResponse.json('Grade Not found!', { status: 400 });
    }

    const student = await prisma.student.findFirst({
      where: {
        rollNO: isInNursery ? rollNo + 'NUR' : rollNo,
      },
    });

    if (!student) {
      return NextResponse.json('Student Not found!', { status: 400 });
    }

    const formattedDate = student.dob
      .toISOString()
      .split('T')[0]
      .replace(/-/g, '');

    if (formattedDate !== password) {
      return NextResponse.json('Invalid Credentials!', { status: 400 });
    }

    if (student.phone !== phone) {
      return NextResponse.json('Invalid Credentials!', { status: 400 });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      student.rollNO,
    );

    return NextResponse.json(
      { accessToken: accessToken, refreshToken: refreshToken },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json('Internal Server Error!', { status: 500 });
  }
}

'use server';
import bcrypt from 'bcrypt';
import prisma from '@/db';
import { GradeName, ROLE, SECTION } from '@prisma/client';

export default async function addTeacher({
  fullname,
  email,
  password,
  role,
  grade,
  section,
}: {
  fullname: string;
  email: string;
  password: string;
  role: string;
  grade: string;
  section: string;
}) {
  if (!fullname || !email || !password || !role || !grade || !section) {
    return { error: 'Please fill all the fields' };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

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

    await prisma.teacher.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        role: role as ROLE,
        gradeId: gradeId?.id,
        section: section as SECTION,
      },
    });

    return { success: 'Teacher added successfully' };
  } catch (error) {
    return { error: 'Error while adding teacher.' };
  }
}

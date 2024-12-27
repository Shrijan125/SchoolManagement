'use server';
import bcrypt from 'bcrypt';
import prisma from '@/db';
import { Grade, Role } from '@prisma/client';

export default async function addTeacher({
  fullname,
  email,
  password,
  role,
  grades,
  subjectIds,
}: {
  fullname: string;
  email: string;
  password: string;
  role: Role;
  grades: Grade[];
  subjectIds: string[];
}) {
  if (!fullname || !email || !password || !role || !subjectIds) {
    return { error: 'Please fill all the fields' };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.teacher.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        role,
        subjects: {
          connect: subjectIds.map(id => ({ id }))
        }
      },
      include: {
        subjects: true // Include related subjects in the response if needed
      }
    });

    return { success: 'Teacher added successfully' };
  } catch (error) {
    console.error('Error creating teacher:', error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Error while adding teacher.' };
  }
}
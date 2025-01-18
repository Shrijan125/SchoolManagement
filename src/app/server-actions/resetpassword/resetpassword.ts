'use server';
import bcrypt from 'bcrypt';

import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import {
  resetformSchema,
  ResetFormSchema,
} from '@/lib/schemas/reset-password-schema';
import { getServerSession } from 'next-auth';

export async function resetPassword(value: ResetFormSchema) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) return { error: 'Unauthorised!' };

  const validationResult = resetformSchema.safeParse(value);

  if (!validationResult.success) {
    return { error: 'Invalid input data' };
  }
  const { oldpassword, newpassword, confirmnewpassword } =
    validationResult.data;
  try {
    if (oldpassword === newpassword) {
      return { error: 'Old password and new password cannot be same' };
    }
    if (newpassword !== confirmnewpassword) {
      return { error: 'New password and confirm password must match' };
    }
    const teacher = await prisma.teacher.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        allowed: true,
        password: true,
      },
    });
    if (!teacher) {
      return { error: 'Teacher not found' };
    }
    if (teacher.allowed === false) {
      return { error: 'User not allowed, Contact Administration!' };
    }
    const isPasswordValid = await bcrypt.compare(oldpassword, teacher.password);
    if (!isPasswordValid) {
      return { error: 'Invalid Credentials' };
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await prisma.teacher.update({
      where: {
        email: session.user.email,
      },
      data: {
        password: hashedPassword,
      },
    });
    return { success: 'Password reset successfully' };
  } catch (error) {
    return { error: 'Error while resetting password' };
  }
}

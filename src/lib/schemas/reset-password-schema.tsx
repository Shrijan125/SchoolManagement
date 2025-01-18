import { z } from 'zod';

export const resetformSchema = z
  .object({
    oldpassword: z.string().min(6).max(100),
    newpassword: z.string().min(6).max(100),
    confirmnewpassword: z.string().min(6).max(100),
  })
  .refine((data) => data.newpassword === data.confirmnewpassword, {
    message: 'New password and confirm password must match',
    path: ['confirmnewpassword'],
  })
  .refine((data) => data.oldpassword !== data.newpassword, {
    message: 'New password cannot be the same as the old password',
    path: ['newpassword'],
  });

export type ResetFormSchema = z.infer<typeof resetformSchema>;

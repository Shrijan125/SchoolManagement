import { z } from 'zod';
export const createAssignmentFormSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().min(1, 'Section is required'),
  subjects: z.array(
    z.object({
      subjectName: z.string().min(1, 'Subject name is required'),
      subjectTask: z.string().min(1, 'Assignment task is required'),
    }),
  ),
});

export type CreateAssignmentSchema = z.infer<typeof createAssignmentFormSchema>;

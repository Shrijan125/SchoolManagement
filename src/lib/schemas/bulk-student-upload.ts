import { z } from 'zod';
export const bulkstudentFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  rollNO: z.string().min(1, 'Roll number is required'),
  serialNO: z.string().min(1, 'Serial number is required'),
  dob: z
    .union([
      z
        .string()
        .regex(
          /^\d{2}-\d{2}-\d{4}$/,
          'Date of Birth must be in the format dd-mm-yyyy',
        ),
      z.literal(''),
      z.null(),
      z.undefined(),
    ])
    .optional(),
  fathersName: z.string().min(1, 'Father name is required'),
  mothersName: z.string().min(1, 'Mother name is required'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  alternatePhone: z
    .string()
    .regex(/^\d{10}$/, 'Alternate phone number must be exactly 10 digits')
    .or(z.literal(''))
    .optional(),
  address: z.string().min(1, 'Address is required'),
  gender: z.string().min(1, 'Gender is required'),
  aadhar: z.string().min(1, 'Aadhar is required').optional().or(z.literal('')),
  bloodGroup: z.string().optional().or(z.literal('')),
});

export type BulkStudentFormSchema = z.infer<typeof bulkstudentFormSchema>;

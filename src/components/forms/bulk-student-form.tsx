'use client';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GradeName, SECTION } from '@prisma/client';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Loader from '../loader';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import ValidationErrorsDialog from '../validation-error';
import {
  bulkstudentFormSchema,
  BulkStudentFormSchema,
} from '@/lib/schemas/bulk-student-upload';
import { addbulkStudent } from '@/app/server-actions/students/student';

const formatExcelDate = (serialDate: number): string => {
  const date = new Date(Math.round((serialDate - 25569) * 86400 * 1000));
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const bulkstudentUploadformSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().min(1, 'Section is required'),
  file: z
    .instanceof(File, { message: 'File is required' })
    .refine(
      (file) =>
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      {
        message: 'Only Excel files are allowed',
      },
    ),
});

const BulkStudentForm = () => {
  const form = useForm<z.infer<typeof bulkstudentUploadformSchema>>({
    resolver: zodResolver(bulkstudentUploadformSchema),
    defaultValues: {
      grade: '',
      section: '',
      file: undefined,
    },
  });
  const isLoading = form.formState.isSubmitting;
  const [validationErrors, setValidationErrors] = useState<
    { row: number; errors: string[] }[]
  >([]);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const parseExcelFile = async (
    file: File,
  ): Promise<{
    data: BulkStudentFormSchema[];
    errors: { row: number; errors: string[] }[];
  }> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const validatedData: BulkStudentFormSchema[] = [];
      const errors: { row: number; errors: string[] }[] = [];

      jsonData.forEach((row: any, index: number) => {
        const studentData = {
          name: String(row.Name || ''),
          rollNO: String(row.Admno || ''),
          serialNO: String(row['Roll No'] || ''),
          fathersName: String(row["Father's Name"] || ''),
          mothersName: String(row["Mother's Name"] || ''),
          gender: String(row.Gender || ''),
          bloodGroup: String(row['Blood Group'] || ''),
          aadhar: String(row.Aadhar || ''),
          phone: String(row['Phone Number'] || ''),
          alternatePhone: String(row['Alternate Phone'] || ''),
          dob:
            typeof row.DOB === 'number'
              ? formatExcelDate(row.DOB)
              : String(row.DOB || ''),
          address: String(row.Address || ''),
        };

        const result = bulkstudentFormSchema.safeParse(studentData);

        if (result.success) {
          validatedData.push(result.data);
        } else {
          errors.push({
            row: index + 2,
            errors: result.error.errors.map(
              (err) => `${err.path.join('.')}: ${err.message}`,
            ),
          });
        }
      });

      return {
        data: validatedData,
        errors: errors,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse Excel file: ${error.message}`);
      }
      throw new Error('Failed to parse Excel file');
    }
  };

  async function onSubmit(value: z.infer<typeof bulkstudentUploadformSchema>) {
    try {
      const { data, errors } = await parseExcelFile(value.file);
      if (errors.length > 0) {
        setValidationErrors(errors);
        setShowErrorDialog(true);
        form.reset({
          grade: '',
          section: '',
          file: undefined,
        });
        return;
      }
      const response = await addbulkStudent({
        grade: value.grade,
        section: value.section,
        students: data,
      });
      if (response.error) {
        toast({
          description: 'Failed to upload Student',
          variant: 'destructive',
        });
        // form.reset({
        //   grade: '',
        //   section: '',
        //   file: undefined,
        // });
        return;
      }
      if (response.success) {
        toast({ description: response.success });
        router.back();
      }
    } catch (error) {
      form.reset({
        grade: '',
        section: '',
        file: undefined,
      });
      if (error instanceof Error) {
        toast({ description: error.message, variant: 'destructive' });
        return;
      }
      toast({
        description: 'Failed to parse the file',
        variant: 'destructive',
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:space-y-8 space-y-5"
        >
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(GradeName).map((key) => (
                      <SelectItem key={key} value={key}>
                        {GradeName[key as keyof typeof GradeName]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Section" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(SECTION).map((key) => (
                      <SelectItem key={key} value={key}>
                        {SECTION[key as keyof typeof SECTION]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Choose an excel file"
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                    onClick={(e) => {
                      (e.target as HTMLInputElement).value = '';
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full p-6" disabled={isLoading}>
            {!isLoading ? 'Upload Students' : <Loader />}
          </Button>
        </form>
      </Form>
      <ValidationErrorsDialog
        errors={validationErrors}
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
      />
    </>
  );
};

export default BulkStudentForm;

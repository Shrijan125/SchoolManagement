'use client';
import React from 'react';
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
import { addbulkStudent } from '@/app/server-actions/students/student';
import { useRouter } from 'next/navigation';

export interface StudentData {
  name: string;
  rollNO: string;
  serialNO: string;
}

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
  const { toast } = useToast();
  const router = useRouter();
  const parseExcelFile = async (file: File): Promise<StudentData[]> => {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData.map((row: any) => ({
      name: String(row.name || ''),
      rollNO: String(row.rollNO || ''),
      serialNO: String(row.serialNO || ''),
    }));
  };

  async function onSubmit(value: z.infer<typeof bulkstudentUploadformSchema>) {
    try {
      const students = await parseExcelFile(value.file);
      const response = await addbulkStudent({
        grade: value.grade,
        section: value.section,
        students,
      });
      if (response.error) {
        toast({ description: response.error, variant: 'destructive' });
        form.reset({
          grade: '',
          section: '',
          file: undefined,
        });
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
      toast({
        description: 'Failed to parse the file',
        variant: 'destructive',
      });
    }
  }
  return (
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
          {!isLoading ? 'Create Student' : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default BulkStudentForm;

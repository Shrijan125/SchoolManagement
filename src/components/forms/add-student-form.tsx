'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { GradeName, SECTION } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import Loader from '../loader';
import { addStudent } from '@/app/server-actions/students/student';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const studentFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  grade: z.string().min(1, 'Grade is required'),
  rollNO: z.string().min(1, 'Roll number is required'),
  section: z.string().min(1, 'Section is required'),
  serialNO: z.string().min(1, 'Serial number is required'),
});

const AddStudentForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: '',
      grade: '',
      rollNO: '',
      section: '',
      serialNO: '',
    },
  });

  async function onSubmit(value: z.infer<typeof studentFormSchema>) {
    const response = await addStudent({
      name: value.name,
      grade: value.grade,
      rollNO: value.rollNO,
      section: value.section,
      serialNO: value.serialNO,
    });

    if (response.error) {
      toast({ description: response.error, variant: 'destructive' });
      return;
    }

    if (response.success) {
      router.back();
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:space-y-8 space-y-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name="serialNO"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Serial No" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rollNO"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roll Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Roll No" {...field} />
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

export default AddStudentForm;

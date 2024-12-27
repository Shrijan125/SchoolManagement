'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Loader from '../loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MultiSelect from '../multi-select';
import { Grade, Role, Subject } from '@prisma/client';
import { getSubject } from '@/app/server-actions/subjects/subjects';
import { useToast } from '@/hooks/use-toast';
import addTeacher from '@/app/server-actions/teachers/teachers';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  fullname: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  subject: z.array(z.string().min(2).max(100)).min(1),
  role: z.string().min(2).max(100),
  grade: z.array(z.string().min(1).max(100)).min(1),
});

const AddTeacherForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      fullname: '',
      subject: [],
      role: '',
      grade: [],
    },
  });

  const [subject, setSubject] = useState<Subject[]>();
  const isLoading = form.formState.isSubmitting;
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const response = await addTeacher({
      fullname: value.fullname,
      email: value.email,
      password: value.password,
      role: value.role as Role,
      grades: value.grade as Grade[],
      subjectIds: value.subject,
    });

    if (response.error) {
      toast({ description: response.error, variant: 'destructive' });
      form.reset();
      return;
    }

    router.back();
  }

  useEffect(() => {
    getSubject().then((response) => {
      if (response.data) {
        setSubject(response.data);
      }
      if (response.error) {
        toast({ description: response.error, variant: 'destructive' });
      }
    });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:space-y-8 space-y-5"
      >
        <FormField
          control={form.control}
          name="fullname"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subjects</FormLabel>
              <FormControl>
                <MultiSelect
                  options={
                    subject?.map((s) => ({ label: s.name, value: s.id })) || []
                  }
                  placeholder="Select Subjects"
                  value={field.value || []}
                  onChange={field.onChange}
                />
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
              <FormControl>
                <MultiSelect
                  options={
                    Object.keys(Grade).map((key) => ({
                      label: key,
                      value: key,
                    })) || []
                  }
                  placeholder="Select Grade"
                  value={field.value || []}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a valid role for the teacher" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Role).map((key) => (
                    <SelectItem key={key} value={key}>
                      {Role[key as keyof typeof Role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full p-6" disabled={isLoading}>
          {!isLoading ? 'Create Teacher' : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default AddTeacherForm;

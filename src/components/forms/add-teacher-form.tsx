'use client';
import React from 'react';
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
import { GradeName, ROLE, SECTION } from '@prisma/client';
import { useToast } from '@/hooks/use-toast';
import addTeacher from '@/app/server-actions/teachers/teachers';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  fullname: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.string().min(2).max(100),
  grade: z.string().min(1).max(100),
  section: z.string().min(1).max(100),
});

const AddTeacherForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      fullname: '',
      role: '',
      grade: '',
      section: '',
    },
  });

  const isLoading = form.formState.isSubmitting;
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(value: z.infer<typeof formSchema>) {
    console.log(value);
    const response = await addTeacher({
      fullname: value.fullname,
      email: value.email,
      password: value.password,
      role: value.role,
      grade: value.grade,
      section: value.section,
    });
    if (response.error) {
      toast({ description: response.error, variant: 'destructive' });
      // form.reset();
      return;
    }

    router.back();
  }

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
                  {Object.keys(ROLE).map((key) => (
                    <SelectItem key={key} value={key}>
                      {ROLE[key as keyof typeof ROLE]}
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

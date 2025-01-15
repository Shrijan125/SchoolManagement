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
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLoading = form.formState.isSubmitting;
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      const result = await signIn('credentials', {
        email: value.email,
        password: value.password,
        redirect: false,
      });
      if (result?.error) {
        throw new Error(result.error);
      }
      router.replace('/admin');
    } catch (error) {
      if (error instanceof Error) {
        toast({ description: error.message, variant: 'destructive' });
        return;
      }
      toast({ description: 'An error occurred', variant: 'destructive' });
      form.reset();
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
        <Button type="submit" className="w-full p-6" disabled={isLoading}>
          {!isLoading ? 'SignIn' : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;

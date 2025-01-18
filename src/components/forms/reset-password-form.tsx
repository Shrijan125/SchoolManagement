'use client';
import {
  resetformSchema,
  ResetFormSchema,
} from '@/lib/schemas/reset-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
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
import { resetPassword } from '@/app/server-actions/resetpassword/resetpassword';
import { useToast } from '@/hooks/use-toast';
import { signOut } from 'next-auth/react';

const ResetPasswordForm = () => {
  const { toast } = useToast();
  const form = useForm<ResetFormSchema>({
    resolver: zodResolver(resetformSchema),
    defaultValues: {
      oldpassword: '',
      newpassword: '',
      confirmnewpassword: '',
    },
  });
  async function onSubmit(value: ResetFormSchema) {
    const response = await resetPassword(value);
    if (response.error) {
      toast({ description: response.error, variant: 'destructive' });
      form.reset();
      return;
    }
    if (response.success) {
      toast({
        title: response.success,
        description: 'You will have to sign in again',
      });
      setTimeout(() => {
        signOut();
      }, 3000);
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
          name="oldpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input placeholder="Old Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmnewpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm new Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full p-6" disabled={isLoading}>
          {!isLoading ? 'Reset Password' : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;

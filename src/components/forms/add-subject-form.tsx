'use client';
import React, { useEffect } from 'react';
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
import {
  addSubject,
  updateSubject,
} from '@/app/server-actions/subjects/subjects';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Category } from '@prisma/client';

const formSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.string().min(1),
});

interface AddSubjectFormProps {
  defname: string;
  defcategory: string;
  update?: string;
}

const AddSubjectForm: React.FC<AddSubjectFormProps> = ({
  defname,
  defcategory,
  update,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defname,
      category: defcategory,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    form.reset({
      name: defname,
      category: defcategory,
    });
  }, [defname, defcategory, form]);

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const response =
      update !== undefined
        ? await updateSubject({
            id: update!,
            category: value.category as Category,
            name: value.name,
          })
        : await addSubject({
            category: value.category as Category,
            name: value.name,
          });
    if (response?.error) {
      toast({ description: response.error, variant: 'destructive' });
      form.reset();
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Name</FormLabel>
              <FormControl>
                <Input placeholder="Subject Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a valid category for the subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Category).map((key) => (
                    <SelectItem key={key} value={key}>
                      {Category[key as keyof typeof Category]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full p-6" disabled={isLoading}>
          {!isLoading ? (
            update !== undefined ? (
              'Update Subject'
            ) : (
              'Create Subject'
            )
          ) : (
            <Loader />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddSubjectForm;

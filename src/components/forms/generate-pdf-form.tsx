'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GradeName, SECTION } from '@prisma/client';
import { Button } from '../ui/button';
import Loader from '../loader';
import generateResultbyClass from '@/app/server-actions/results/route';
import { useToast } from '@/hooks/use-toast';
import RenderStudentPDFs from '../react-pdf';
import { NurseryResultProps } from '../results/nursery-result';
import { PrimaryResultProps } from '../results/primary-result';

const GenerateResultFormSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().min(1, 'Section is required'),
});

const GenerateResultForm = () => {
  const defaultValues = {
    grade: '',
    section: '',
  };
  const [data, setData] = useState<NurseryResultProps[] | PrimaryResultProps[]>(
    [],
  );
  const [category, setCategory] = useState<string>('');
  const form = useForm<z.infer<typeof GenerateResultFormSchema>>({
    resolver: zodResolver(GenerateResultFormSchema),
    defaultValues: defaultValues,
  });
  const { toast } = useToast();
  const isLoading = form.formState.isSubmitting;
  async function onSubmit(value: z.infer<typeof GenerateResultFormSchema>) {
    setData([]);
    const response = await generateResultbyClass(value);
    if (response?.error) {
      form.reset(defaultValues);
      toast({ description: response.error, variant: 'destructive' });
      return;
    }
    if (response?.data) {
      setData(response.data);
      setCategory(response.category);
      toast({ description: 'Result Generated Successfully', duration: 3000 });
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
          <Button type="submit" className="w-full p-6" disabled={isLoading}>
            {!isLoading ? 'Generate Result' : <Loader />}
          </Button>
        </form>
      </Form>
      {data && Object.keys(data).length > 0 && (
        <RenderStudentPDFs data={data} category={category}></RenderStudentPDFs>
      )}
    </>
  );
};

export default GenerateResultForm;

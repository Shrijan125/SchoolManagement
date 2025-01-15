'use client';
import React from 'react';
import { z } from 'zod';
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
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GradeName, SECTION } from '@prisma/client';
import { Button } from '../ui/button';
import { Loader, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { createAssignment } from '@/app/server-actions/assignment/assignment';
import {
  createAssignmentFormSchema,
  CreateAssignmentSchema,
} from '@/lib/schemas/assignment-schema';

const CreateAssignmentForm = () => {
  const { toast } = useToast();
  const form = useForm<CreateAssignmentSchema>({
    resolver: zodResolver(createAssignmentFormSchema),
    defaultValues: {
      grade: '',
      section: '',
      subjects: [{ subjectName: '', subjectTask: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subjects',
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(value: z.infer<typeof createAssignmentFormSchema>) {
    const response = await createAssignment(value);
    if (response.error) {
      toast({ description: response.error, variant: 'destructive' });
    }
    if (response.success) {
      toast({ description: response.success });
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

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <div className="flex flex-1 gap-1">
                <FormField
                  control={form.control}
                  name={`subjects.${index}.subjectName`}
                  render={({ field }) => (
                    <FormItem className="w-[30%]">
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`subjects.${index}.subjectTask`}
                  render={({ field }) => (
                    <FormItem className="w-[70%]">
                      <FormLabel>Assignment</FormLabel>
                      <FormControl>
                        <Input placeholder="Assignment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-8"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ subjectName: '', subjectTask: '' })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </div>

        <Button type="submit" className="w-full p-6" disabled={isLoading}>
          {!isLoading ? 'Create Assignment' : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default CreateAssignmentForm;

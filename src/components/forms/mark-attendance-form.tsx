'use client';
import React, { useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GradeName, SECTION } from '@prisma/client';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown, Loader } from 'lucide-react';
import { getStudentbySection } from '@/app/server-actions/students/student';
import { useToast } from '@/hooks/use-toast';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { markAttendance } from '@/app/server-actions/attendance/attendance';

const markAttendanceFormSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().min(1, 'Section is required'),
  students: z.array(z.string()).min(1, 'At least one student is required'),
});

const MarkAttendanceForm = () => {
  const { toast } = useToast();
  const [frameworks, setFramework] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [isFetchingStudents, setIsFetchingStudents] = useState(true);
  const form = useForm<z.infer<typeof markAttendanceFormSchema>>({
    resolver: zodResolver(markAttendanceFormSchema),
    defaultValues: {
      grade: '',
      section: '',
      students: [],
    },
  });

  useEffect(() => {
    const grade = form.watch('grade');
    const section = form.watch('section');
    setIsFetchingStudents(true);
    form.setValue('students', []);

    if (grade && section) {
      getStudentbySection({ grade, section }).then((data) => {
        if (data.error) {
          toast({ description: data.error, variant: 'destructive' });
          form.reset({ grade, section, students: [] });
          return;
        }
        if (data.students) {
          setFramework(
            data.students.map((student) => ({
              value: student.rollNO,
              label: student.serialNO + ' - ' + student.name,
            })),
          );
        }
        setIsFetchingStudents(false);
      });
    }
  }, [form.watch('grade'), form.watch('section'), form]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(value: z.infer<typeof markAttendanceFormSchema>) {
    const response = await markAttendance({
      grade: value.grade,
      section: value.section,
      students: value.students,
    });

    if (response.error) {
      toast({ description: response.error, variant: 'destructive' });
    }
    if (response.success) {
      toast({ description: response.success });
      form.reset({ grade: '', section: '', students: [] });
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
          name="students"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Students</FormLabel>
              <Popover>
                <PopoverTrigger disabled={isFetchingStudents} asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {field.value?.length
                        ? `${field.value.length} students selected`
                        : 'Select students'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[570px] p-0">
                  <Command>
                    <CommandInput placeholder="Search students..." />
                    <CommandEmpty>No students found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={() => {
                              const newValue = field.value.includes(
                                framework.value,
                              )
                                ? field.value.filter(
                                    (v) => v !== framework.value,
                                  )
                                : [...field.value, framework.value];
                              field.onChange(newValue);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value?.includes(framework.value)
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="flex gap-2 justify-start mt-2 flex-wrap">
                {field.value?.map((val) => (
                  <div
                    key={val}
                    className="px-2 py-1 rounded-xl border bg-primarycolor text-xs font-medium"
                  >
                    {
                      frameworks.find((framework) => framework.value === val)
                        ?.label
                    }
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full p-6" disabled={isLoading}>
          {!isLoading ? 'Mark Absent' : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default MarkAttendanceForm;

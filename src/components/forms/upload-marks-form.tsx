'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as XLSX from 'xlsx';
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
import {  GradeName, SECTION } from '@prisma/client';
import { useToast } from '@/hooks/use-toast';
import getExamsByGrades from '@/app/server-actions/exams/exams';
import Loader from '../loader';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { uploadMarksInBulk } from '@/app/server-actions/marks/marks';
import { useRouter } from 'next/navigation';

const BulkMarksUploadFormSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().min(1, 'Section is required'),
  exam: z.string().min(1, 'Exam is required'),
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

export interface BulkMarksUploadFormData {
  rollNO: string;
  serialNO: string;
  name: string;
  englishwritten: number;
  englishoral:number;
  englishrhymes:number;
  hindiwritten:number;
  hindioral:number;
  hindirhymes:number;
  mathswritten:number;
  mathsoral:number;
  gs:number;
  activity:number;
  drawing:number;
  pt:number;
  spelldict:number;
  conversation:number;
  english: number;
  hindi: number;
  maths: number;
  science: number;
  sst: number;
  computer: number;
  gk: number;
  valueedu: number;
  sanskrit: number;
};

const BulkMarksUpload = () => {
  const defaultValues = {
    grade: '',
    section: '',
    exam: '',
    file: undefined,
  };
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof BulkMarksUploadFormSchema>>({
    resolver: zodResolver(BulkMarksUploadFormSchema),
    defaultValues: defaultValues,
  });
  const parseExcelFile = async (file: File): Promise<BulkMarksUploadFormData[]> => {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      return jsonData.map((row: any) => ({
        rollNO: String(row.rollNO || ''),
        serialNO: String(row.serialNO || ''),
        name: String(row.Name || ''),
        englishwritten: Number(row.EnglishWritten || 0),
        englishoral: Number(row.EnglishOral || 0),
        englishrhymes: Number(row.EnglishRhymes || 0),
        hindiwritten: Number(row.HindiWritten || 0),
        hindioral: Number(row.HindiOral || 0),
        hindirhymes: Number(row.HindiRhymes || 0),
        mathswritten: Number(row.MathsWritten || 0),
        mathsoral: Number(row.MathsOral || 0),
        gs: Number(row.GS || 0),
        activity: Number(row.Activity || 0),
        drawing: Number(row.Drawing || 0),
        pt: Number(row.PT || 0),
        spelldict: Number(row.SpellDict || 0),
        conversation: Number(row.Conversation || 0),
        english: Number(row.English || 0),
        hindi: Number(row.Hindi || 0),
        maths: Number(row.Maths || 0),
        science: Number(row.Science || 0),
        sst: Number(row.SST || 0),
        computer: Number(row.Computer || 0),
        gk: Number(row.GK || 0),
        valueedu: Number(row.ValueEdu || 0),
        sanskrit: Number(row.Sanskrit || 0),
      }));
    };
  const isLoading = form.formState.isSubmitting;
  const [exams, setExams] = useState<{ key: string; value: string }[]>([]);
  const { toast } = useToast();
  const selectedGrade = form.watch('grade');
  useEffect(() => {
    if (selectedGrade) {
      setLoading(true);
      getExamsByGrades({ grade: selectedGrade })
        .then((data) => {
          if (data.error) {
            toast({ description: data.error, variant: 'destructive' });
            return;
          }
          if (data.data) {
            console.log(data.data);
            const examKeyValuePairs = data.data.map((exam) => ({
              key: exam.name + '  -  ' + exam.totalMarks,
              value: exam.id,
            }));
            setExams(examKeyValuePairs);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          toast({
            description: 'Failed to fetch Exams',
            variant: 'destructive',
          });
        });
    }
  }, [selectedGrade]);
  const router = useRouter();
  async function onSubmit(value: z.infer<typeof BulkMarksUploadFormSchema>) {
   try {
     const marks = await parseExcelFile(value.file);
     const response = await uploadMarksInBulk({
      grade: value.grade,
      exam: value.exam,
      section: value.section,
      marks,
     });
     if(response.error)
     {
      toast({description: response.error, variant: 'destructive'});
      form.reset(defaultValues);
      return;
     }
     if(response.data)
     {
      toast({description: 'Marks uploaded successfully'});
        router.back();
     }
   } catch (error) {
    form.reset(defaultValues);
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
          name="exam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exam</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Exam" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loading ? (
                    <Loader />
                  ) : (
                    exams.map((exam) => (
                      <SelectItem key={exam.key} value={exam.value}>
                        {exam.key}
                      </SelectItem>
                    ))
                  )}
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

export default BulkMarksUpload;

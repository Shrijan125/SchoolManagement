'use server';
import { BulkMarksUploadFormData } from '@/components/forms/upload-marks-form';
import prisma from '@/db';
import { CATEGORYNAME, GradeName } from '@prisma/client';

export async function uploadMarksInBulk({
  grade,
  exam,
  section,
  marks,
}: {
  grade: string;
  exam: string;
  section: string;
  marks: BulkMarksUploadFormData[];
}) {
  if (!grade || !exam || !section || !marks || marks.length === 0) {
    return { error: 'All fields are required' };
  }
  try {
    const category = await prisma.grade.findFirst({
      where: {
        name: grade as GradeName,
      },
      select: {
        category: true,
      },
    });
    if (!category) {
      return { error: 'Invalid Grade' };
    }
    if (category.category.name === CATEGORYNAME.NURSERY) {
      await prisma.$transaction(async (tx) => {
        await tx.nurResult.createMany({
          data: marks.map((mark) => ({
            sessionID: process.env.NEXTSESSION_ID as string,
            examID: exam,
            studentID: mark.rollNO,
            englishwritten: Math.round(mark.englishwritten),
            englishoral: Math.round(mark.englishoral),
            englishrhymes: Math.round(mark.englishrhymes),
            hindiwritten: Math.round(mark.hindiwritten),
            hindioral: Math.round(mark.hindioral),
            hindirhymes: Math.round(mark.hindirhymes),
            mathswritten: Math.round(mark.mathswritten),
            mathsoral: Math.round(mark.mathsoral),
            gs: Math.round(mark.gs),
            activity: Math.round(mark.activity),
            drawing: Math.round(mark.drawing),
            pt: Math.round(mark.pt),
            spelldict: Math.round(mark.spelldict),
            conversation: Math.round(mark.conversation),
          })),
        });
      });
    }
    if (category.category.name === CATEGORYNAME.PRIMARY) {
      await prisma.$transaction(async (tx) => {
        await tx.priResult.createMany({
          data: marks.map((mark) => ({
            sessionID: process.env.NEXTSESSION_ID as string,
            examID: exam,
            studentID: mark.rollNO,
            english: Math.round(mark.english),
            hindi: Math.round(mark.hindi),
            maths: Math.round(mark.maths),
            science: Math.round(mark.science),
            sst: Math.round(mark.sst),
            computer: Math.round(mark.computer),
            gk: Math.round(mark.gk),
            valueedu: Math.round(mark.valueedu),
            sanskrit: Math.round(mark.sanskrit),
          })),
        });
      });
    }
    if (category.category.name === CATEGORYNAME.SECONDARY) {
      await prisma.$transaction(async (tx) => {
        await tx.secResult.createMany({
          data: marks.map((mark) => ({
            sessionID: process.env.NEXTSESSION_ID as string,
            examID: exam,
            studentID: mark.rollNO,
            english: Math.round(mark.english),
            hindi: Math.round(mark.hindi),
            maths: Math.round(mark.maths),
            science: Math.round(mark.science),
            sst: Math.round(mark.sst),
          })),
        });
      });
    }

    return { data: 'Marks uploaded successfully' };
  } catch (error) {
    return { error: 'Failed to upload marks' };
  }
}

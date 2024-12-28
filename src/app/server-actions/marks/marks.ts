'use server';
import { BulkMarksUploadFormData } from "@/components/forms/upload-marks-form";
import prisma from "@/db";
import { CATEGORYNAME, GradeName } from "@prisma/client";

export async function uploadMarksInBulk({ grade, exam, section, marks}:{
    grade: string,
    exam: string,
    section: string,
    marks: BulkMarksUploadFormData[]})
{
    if(!grade || !exam || !section || !marks || marks.length === 0)
    {
       return {error: "All fields are required"};
    }
    try {
        const category = await prisma.grade.findFirst({
            where:{
                name: grade as GradeName
            },
            select:{
                category: true
            }
        });
        if(!category)
        {
            return {error: "Invalid Grade"};
        }
        if(category.category.name === CATEGORYNAME.NURSERY)
        {
            await prisma.$transaction(async (tx) => {
                await tx.nurResult.createMany({
                    data: marks.map((mark) => ({
                        sessionID: process.env.NEXTSESSION_ID as string,
                        examID: exam,
                        studentID: mark.rollNO,
                        englishwritten: mark.englishwritten,
                        englishoral: mark.englishoral,
                        englishrhymes: mark.englishrhymes,
                        hindiwritten: mark.hindiwritten,
                        hindioral: mark.hindioral,
                        hindirhymes: mark.hindirhymes,
                        mathswritten: mark.mathswritten,
                        mathsoral: mark.mathsoral,
                        gs: mark.gs,
                        activity: mark.activity,
                        drawing: mark.drawing,
                        pt: mark.pt,
                        spelldict: mark.spelldict,
                        conversation: mark.conversation,
                    })),
                });
            });
        }
        if(category.category.name === CATEGORYNAME.PRIMARY)
        {
            await prisma.$transaction(async (tx) => {
                await tx.priResult.createMany({
                    data: marks.map((mark) => ({
                        sessionID: process.env.NEXTSESSION_ID as string,
                        examID: exam,
                        studentID: mark.rollNO,
                        english: mark.english,
                        hindi: mark.hindi,
                        maths: mark.maths,
                        science: mark.science,
                        sst: mark.sst,
                        computer: mark.computer,
                        gk: mark.gk,
                        valueedu: mark.valueedu,
                        sanskrit: mark.sanskrit,
                    })),
                });
            });
        }
        if(category.category.name === CATEGORYNAME.SECONDARY)
        {
            await prisma.$transaction(async (tx) => {
                await tx.secResult.createMany({
                    data: marks.map((mark) => ({
                        sessionID: process.env.NEXTSESSION_ID as string,
                        examID: exam,
                        studentID: mark.rollNO,
                        english: mark.english,
                        hindi: mark.hindi,
                        maths: mark.maths,
                        science: mark.science,
                        sst: mark.sst,
                    })),
                });
            });
        }

        return {data: "Marks uploaded successfully"};
    } catch (error) {
        return {error: "Failed to upload marks"};
    }
}
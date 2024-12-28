'use server';

import prisma from "@/db";
import { CATEGORYNAME, GradeName, SECTION } from "@prisma/client";

type Marks = {
    englishwritten: number;
    englishoral: number;
    englishrhymes: number;
    hindiwritten: number;
    hindioral: number;
    hindirhymes: number;
    mathswritten: number;
    mathsoral: number;
    gs: number;
    activity: number;
    spelldict: number;
    drawing: number;
    pt: number;
    conversation: number;
  };

type StudentResultMap = {
    [studentId: string]: {
      [examName: string]: Marks;
    };
  };
  const transformResults = (nurseryResults: any[]): StudentResultMap => {
    const resultMap: StudentResultMap = {};
  
    nurseryResults.forEach((result) => {
      if (!resultMap[result.studentID]) {
        resultMap[result.studentID] = {};
      }
  
      resultMap[result.studentID][result.exam.name] = {
        englishwritten: result.englishwritten,
        englishoral: result.englishoral,
        englishrhymes: result.englishrhymes,
        hindiwritten: result.hindiwritten,
        hindioral: result.hindioral,
        hindirhymes: result.hindirhymes,
        mathswritten: result.mathswritten,
        mathsoral: result.mathsoral,
        gs: result.gs,
        activity: result.activity,
        spelldict: result.spelldict,
        drawing: result.drawing,
        pt: result.pt,
        conversation: result.conversation,
      };
    });
  
    return resultMap;
  };
export default async function generateResultbyClass({grade, section} : {grade:string, section:string})
{
    if(!grade || !section)
    {
        return {error: "All fields are required"};
    }
    try {
        const students = await prisma.grade.findFirst({
            where:{
                name: grade as GradeName
            },
            select:{
                student:{
                    where:{
                        Section:section as SECTION
                    },
                    select:{
                        rollNO: true,
                        name: true,
                        serialNO: true
                    }
                },
                category: true
            }
        });
        if(!students || students.student.length === 0 || !students.category)
        {
            return {error: "No students found"};
        }
        if(students.category.name === CATEGORYNAME.NURSERY)
        {
            const nurseryResults = await prisma.nurResult.findMany({
                where:{
                    studentID:{
                        in: students.student.map((student) => student.rollNO)
                    },
                },
                include:{
                    exam:{
                        select:{
                            name: true
                        }
                    }
                }
            });
            const transformedResults = transformResults(nurseryResults);
            return {data: transformedResults};
        }
        if(students.category.name === CATEGORYNAME.PRIMARY)
        {
            const primaryResults = await prisma.priResult.findMany({
                where:{
                    studentID:{
                        in: students.student.map((student) => student.rollNO)
                    }
                }
            });
            return {data: primaryResults};
        }
        
        if(students.category.name === CATEGORYNAME.SECONDARY)
        {
            const secondaryResults = await prisma.secResult.findMany({
                where:{
                    studentID:{
                        in: students.student.map((student) => student.rollNO)
                    }
                }
            });
            return {data: secondaryResults};
        }
    } catch (error) {
        return {error: "Error while fetching results"};
    }
}
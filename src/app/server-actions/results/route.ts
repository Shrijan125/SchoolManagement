'use server';

import { NurseryResultProps } from '@/components/results/nursery-result';
import { PrimaryResultProps } from '@/components/results/primary-result';
import prisma from '@/db';
import { CATEGORYNAME, GradeName, SECTION } from '@prisma/client';

const subjects = [
  'englishWritten',
  'englishOral',
  'englishRhymes',
  'hindiWritten',
  'hindiOral',
  'hindiRhymes',
  'mathsWritten',
  'mathsOral',
  'gs',
  'activity',
  'spellDict',
  'drawing',
  'pt',
  'conversation',
];

const primarySubjects = [
  'english',
  'hindi',
  'maths',
  'science',
  'sst',
  'computer',
  'gk',
  'valueedu',
  'sanskrit',
];

function transformPrimaryResults(results: any[]): PrimaryResultProps[] {
  const groupedResults: { [key: string]: any[] } = {};

  results.forEach((result) => {
    const studentID = result.studentID;
    if (!groupedResults[studentID]) {
      groupedResults[studentID] = [];
    }
    groupedResults[studentID].push(result);
  });

  const transformedResults = Object.values(groupedResults).map(
    (studentResults) => {
      const studentInfo = studentResults[0].student;
      const session = studentResults[0].session['name'];

      const subjectScores: any = {};
      primarySubjects.forEach((subject) => {
        subjectScores[subject] = {
          pa1: 0,
          pf1: 0,
          sea1: 0,
          term1: 0,
          total1: 0,
          pa2: 0,
          pf2: 0,
          sea2: 0,
          term2: 0,
          total2: 0,
          grandTotal: 0,
          grade: '',
        };
      });
      studentResults.forEach((result) => {
        const examName = result.exam.name.toLowerCase();
        const scoreType = examName.includes('pa-1')
          ? 'pa1'
          : examName.includes('pf-1')
            ? 'pf1'
            : examName.includes('sea-1')
              ? 'sea1'
              : examName.includes('term-1')
                ? 'term1'
                : examName.includes('pa-2')
                  ? 'pa2'
                  : examName.includes('pf-2')
                    ? 'pf2'
                    : examName.includes('sea-2')
                      ? 'sea2'
                      : examName.includes('term-2')
                        ? 'term2'
                        : null;

        if (scoreType) {
          primarySubjects.forEach((subject) => {
            const key = subject.toLowerCase();
            subjectScores[subject][scoreType] = result[key];
          });
        }
      });

      let totalMarksObtained = 0;
      let maxMarks = 0;

      Object.values(subjectScores).forEach((scores: any) => {
        scores.total1 = Math.round(
          scores.pa1 + scores.pf1 + scores.sea1 + scores.term1,
        );
        scores.total2 = Math.round(
          scores.pa2 + scores.pf2 + scores.sea2 + scores.term2,
        );
        scores.grandTotal = Math.round((scores.total1 + scores.total2) / 2);
        scores.grade = calculateGrade(scores.grandTotal);

        totalMarksObtained += scores.grandTotal;
        maxMarks += 100;
      });

      const temp = (totalMarksObtained / maxMarks) * 100;
      const percentage = temp.toFixed(2);
      const overallGrade = calculateGrade(parseFloat(percentage));

      return {
        name: studentInfo.name,
        admNo: studentInfo.rollNO,
        serNo: studentInfo.serialNO,
        grade: studentInfo.grade.name,
        section: studentInfo.Section,
        session,
        ...subjectScores,
        maxMarks,
        marksObtained: totalMarksObtained,
        percentage,
        overallGrade,
        rank: '',
      };
    },
  );

  transformedResults.sort((a, b) => b.percentage - a.percentage);
  transformedResults.forEach((result, index) => {
    result.rank = `${index + 1}`;
  });

  return transformedResults;
}

function transformNurseryResults(results: any[]): NurseryResultProps[] {
  const groupedResults: { [key: string]: any[] } = {};

  results.forEach((result) => {
    const studentID = result.studentID;
    if (!groupedResults[studentID]) {
      groupedResults[studentID] = [];
    }
    groupedResults[studentID].push(result);
  });

  const transformedResults = Object.values(groupedResults).map(
    (studentResults) => {
      const studentInfo = studentResults[0].student;
      const session = studentResults[0].session['name'];

      const subjectScores: any = {};
      subjects.forEach((subject) => {
        subjectScores[subject] = {
          pa1: 0,
          term1: 0,
          total1: 0,
          pa2: 0,
          term2: 0,
          total2: 0,
          grandTotal: 0,
          grade: '',
        };
      });
      studentResults.forEach((result) => {
        const examName = result.exam.name.toLowerCase();
        const scoreType = examName.includes('pa-1')
          ? 'pa1'
          : examName.includes('term-1')
            ? 'term1'
            : examName.includes('pa-2')
              ? 'pa2'
              : examName.includes('term-2')
                ? 'term2'
                : null;

        if (scoreType) {
          subjects.forEach((subject) => {
            const key = subject.toLowerCase();
            subjectScores[subject][scoreType] = result[key];
          });
        }
      });

      let totalMarksObtained = 0;
      let maxMarks = 0;

      Object.values(subjectScores).forEach((scores: any) => {
        scores.total1 = Math.round(scores.pa1 + scores.term1);
        scores.total2 = Math.round(scores.pa2 + scores.term2);
        scores.grandTotal = Math.round((scores.total1 + scores.total2) / 2);
        scores.grade = calculateGrade(scores.grandTotal);

        totalMarksObtained += scores.grandTotal;
        maxMarks += 100;
      });

      const temp = (totalMarksObtained / maxMarks) * 100;
      const percentage = temp.toFixed(2);
      const overallGrade = calculateGrade(parseFloat(percentage));

      return {
        name: studentInfo.name,
        admNo: studentInfo.rollNO,
        serNo: studentInfo.serialNO,
        grade: studentInfo.grade.name,
        section: studentInfo.Section,
        session,
        ...subjectScores,
        maxMarks,
        marksObtained: totalMarksObtained,
        percentage,
        overallGrade,
        rank: '',
      };
    },
  );

  transformedResults.sort((a, b) => b.percentage - a.percentage);
  transformedResults.forEach((result, index) => {
    result.rank = `${index + 1}`;
  });

  return transformedResults;
}

function calculateGrade(total: number): string {
  if (total >= 91 && total <= 100) return 'A1';
  if (total >= 81 && total <= 90) return 'A2';
  if (total >= 71 && total <= 80) return 'B1';
  if (total >= 61 && total <= 70) return 'B2';
  if (total >= 51 && total <= 60) return 'C1';
  if (total >= 41 && total <= 50) return 'C2';
  if (total >= 33 && total <= 40) return 'D';
  return 'E';
}

export default async function generateResultbyClass({
  grade,
  section,
}: {
  grade: string;
  section: string;
}) {
  if (!grade || !section) {
    return { error: 'All fields are required' };
  }
  try {
    const students = await prisma.grade.findFirst({
      where: {
        name: grade as GradeName,
      },
      select: {
        student: {
          where: {
            Section: section as SECTION,
          },
          select: {
            rollNO: true,
            name: true,
            serialNO: true,
          },
        },
        category: true,
      },
    });
    if (!students || students.student.length === 0 || !students.category) {
      return { error: 'No students found' };
    }
    if (students.category.name === CATEGORYNAME.NURSERY) {
      const nurseryResults = await prisma.nurResult.findMany({
        where: {
          studentID: {
            in: students.student.map((student) => student.rollNO),
          },
        },
        include: {
          student: {
            select: {
              name: true,
              rollNO: true,
              serialNO: true,
              grade: true,
              Section: true,
            },
          },
          exam: {
            select: {
              name: true,
              totalMarks: true,
            },
          },
          session: {
            select: {
              name: true,
            },
          },
        },
      });
      const transformedResults = transformNurseryResults(nurseryResults);
      return { data: transformedResults, category: 'NURSERY' };
    }
    if (students.category.name === CATEGORYNAME.PRIMARY) {
      const primaryResults = await prisma.priResult.findMany({
        where: {
          studentID: {
            in: students.student.map((student) => student.rollNO),
          },
        },
        include: {
          student: {
            select: {
              name: true,
              rollNO: true,
              serialNO: true,
              grade: true,
              Section: true,
            },
          },
          exam: {
            select: {
              name: true,
              totalMarks: true,
            },
          },
          session: {
            select: {
              name: true,
            },
          },
        },
      });
      const transformedResults = transformPrimaryResults(primaryResults);
      return { data: transformedResults, category: 'PRIMARY' };
    }

    if (students.category.name === CATEGORYNAME.SECONDARY) {
      const secondaryResults = await prisma.secResult.findMany({
        where: {
          studentID: {
            in: students.student.map((student) => student.rollNO),
          },
        },
        include: {
          student: {
            select: {
              name: true,
              rollNO: true,
              serialNO: true,
              grade: true,
              Section: true,
            },
          },
          exam: {
            select: {
              name: true,
              totalMarks: true,
            },
          },
          session: {
            select: {
              name: true,
            },
          },
        },
      });
      // const transformedResults = transformPrimaryResults(secondaryResults);
      // return { data: secondaryResults, category : 'SECONDARY' };
    }
  } catch (error) {
    return { error: 'Error while fetching results' };
  }
}

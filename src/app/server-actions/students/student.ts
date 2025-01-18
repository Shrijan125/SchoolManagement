'use server';

import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import {
  studentFormSchema,
  StudentFormSchema,
} from '@/lib/schemas/add-student-form-schema';
import { BulkStudentFormSchema } from '@/lib/schemas/bulk-student-upload';
import { CATEGORYNAME, GENDER, GradeName, SECTION } from '@prisma/client';
import { getServerSession } from 'next-auth';

export async function addStudent(input: StudentFormSchema) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) return { error: 'Unauthorised!' };
  const validationResult = studentFormSchema.safeParse(input);

  if (!validationResult.success) {
    return { error: 'Invalid input data' };
  }
  const {
    name,
    grade,
    section,
    serialNO,
    rollNO,
    fathersName,
    mothersName,
    bloodGroup,
    gender,
    aadhar,
    phone,
    alternatePhone,
    address,
    dob,
  } = validationResult.data;
  try {
    const [day, month, year] = dob.split('-');
    const dobDate = new Date(`${year}-${Number(month) - 1}-${day}`);
    if (isNaN(dobDate.getTime())) {
      return { error: 'Invalid date of birth' };
    }
    const gradeId = await prisma.grade.findFirst({
      where: {
        name: grade as GradeName,
      },
      select: {
        id: true,
        category: true,
      },
    });
    if (!gradeId) {
      return { error: 'Grade not found' };
    }

    const isInNursery = gradeId.category.name === CATEGORYNAME.NURSERY;

    const student = await prisma.student.findFirst({
      where: {
        rollNO: isInNursery ? rollNO + 'NUR' : rollNO,
      },
    });

    if (student) {
      return { error: 'Student already exists' };
    }

    await prisma.student.create({
      data: {
        name,
        gradeID: gradeId?.id,
        sessionID: process.env.NEXTSESSION_ID as string,
        Section: section as SECTION,
        serialNO: serialNO,
        rollNO: isInNursery ? rollNO + 'NUR' : rollNO,
        fathersName,
        mothersName,
        bloodGroup,
        address,
        dob: dobDate,
        alternatePhone,
        phone,
        gender: gender as GENDER,
        aadhar,
      },
    });
    return { success: 'Student added successfully' };
  } catch (error) {
    return { error: 'Error while adding student' };
  }
}

export async function addbulkStudent({
  students,
}: {
  students: BulkStudentFormSchema[];
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) return { error: 'Unauthorised!' };
  if (!students || students.length === 0) {
    return { error: 'Students data is required' };
  }

  try {
    const gradeDetails = await prisma.grade.findMany({
      where: {
        name: {
          in: students.map((s) => s.grade as GradeName),
        },
      },
      select: {
        id: true,
        name: true,
        category: true,
      },
    });

    const gradeMap = Object.fromEntries(
      gradeDetails.map((g) => [g.name, { id: g.id, category: g.category.name }])
    );

    const missingGrades = students
      .map((s) => s.grade)
      .filter((grade) => !gradeMap[grade]);
    if (missingGrades.length > 0) {
      return { error: `Grades not found: ${[...new Set(missingGrades)].join(', ')}` };
    }

    const rollNumbers = students.map((s) =>
      gradeMap[s.grade].category === CATEGORYNAME.NURSERY
        ? s.rollNO + 'NUR'
        : s.rollNO
    );

    const duplicatesInUpload = rollNumbers.filter(
      (num, index) => rollNumbers.indexOf(num) !== index
    );

    if (duplicatesInUpload.length > 0) {
      return {
        error: `Duplicate roll numbers found in upload: ${duplicatesInUpload.join(', ')}`,
      };
    }

    const existingStudents = await prisma.student.findMany({
      where: {
        rollNO: {
          in: rollNumbers,
        },
        sessionID: process.env.NEXTSESSION_ID as string,
      },
      select: {
        rollNO: true,
      },
    });

    if (existingStudents.length > 0) {
      const existingRollNos = existingStudents.map((s) => s.rollNO);
      return {
        error: `Following roll numbers already exist: ${existingRollNos.join(', ')}`,
      };
    }

    const mappedData = students.map((student) => {
      const gradeInfo = gradeMap[student.grade];
      let dobDate: Date | null = null;

      if (student.dob) {
        try {
          const [day, month, year] = student.dob.split('-');
          dobDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
        } catch (error) {
          console.error(
            `Error parsing date for student ${student.rollNO}:`,
            error
          );
        }
      }

      return {
        rollNO:
          gradeInfo.category === CATEGORYNAME.NURSERY
            ? student.rollNO + 'NUR'
            : student.rollNO,
        name: student.name,
        fathersName: student.fathersName,
        mothersName: student.mothersName,
        address: student.address,
        aadhar: student.aadhar,
        gender: student.gender as GENDER,
        phone: student.phone,
        alternatePhone: student.alternatePhone,
        bloodGroup: student.bloodGroup,
        serialNO: student.serialNO,
        gradeID: gradeInfo.id,
        Section: student.section as SECTION,
        dob: dobDate,
        sessionID: process.env.NEXTSESSION_ID as string,
      };
    });

    await prisma.$transaction(async (tx) => {
      await tx.student.createMany({
        data: mappedData,
      });
    });

    return { success: 'Students uploaded successfully!' };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error while adding students:', error.message);
      if (error.message.includes('Unique constraint')) {
        return { error: 'Duplicate roll numbers found' };
      }
      return { error: error.message };
    }
    return { error: 'Error while adding students' };
  }
}


export async function getStudentbySection({
  grade,
  section,
}: {
  grade: string;
  section: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) return { error: 'Unauthorised!' };
  if (!grade || !section) {
    return { error: 'All fields are required' };
  }
  try {
    const gradeId = await prisma.grade.findFirst({
      where: {
        name: grade as GradeName,
      },
      select: {
        id: true,
      },
    });
    if (!gradeId) {
      return { error: 'Grade not found' };
    }
    const students = await prisma.student.findMany({
      where: {
        gradeID: gradeId?.id,
        Section: section as SECTION,
      },
    });
    return { students };
  } catch (error) {
    return { error: 'Error while fetching students' };
  }
}

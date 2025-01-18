'use client';
import { getStudentbySection } from '@/app/server-actions/students/student';
import PlusIconButton from '@/components/custom-buttons/plus-icon-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useState, useEffect } from 'react';
import { Student } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { GradeName, SECTION } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loader from '@/components/loader';
import ActionButton from '@/components/custom-buttons/action-button';

const page = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [students, setStudents] = useState<Student[]>();
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [actiondisabled, setActionDisabled] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();
  // const handleEdit = ({ id }: { id: string }) => {
  //   // setActionDisabled(true);
  //   // router.push(`/admin/editsubject/${id}`);
  //   // setActionDisabled(false);
  // };
  // const handleDelete = async ({ id }: { id: string }) => {
  //   setActionDisabled(true);
  //   // const response = await deleteSubject({ id });
  //   // if (response.error) {
  //   //   toast({ description: response.error, variant: 'destructive' });
  //   // }
  //   // if (response.success) {
  //   //   setData(data?.filter((item) => item.id !== id));
  //   //   toast({ description: 'Subject Deleted' });
  //   // }
  //   setActionDisabled(false);
  // };
  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedGrade && selectedSection) {
        setDataLoading(true);
        const response = await getStudentbySection({
          grade: selectedGrade,
          section: selectedSection,
        });
        if (response.error) {
          toast({ description: response.error, variant: 'destructive' });
        }
        if (response.students) {
          const sortedStudents = response.students.sort((a, b) => {
            const numA = parseInt(a.serialNO) || 0;
            const numB = parseInt(b.serialNO) || 0;
            return numA - numB;
          });
          setStudents(sortedStudents);
        }
        setDataLoading(false);
      }
    };

    fetchStudents();
  }, [selectedGrade, selectedSection]);

  const renderContent = () => {
    if (!selectedGrade || !selectedSection) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-muted-foreground text-lg">
            Please select grade and section to view students
          </p>
        </div>
      );
    }

    if (dataLoading) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      );
    }

    if (!students || students.length === 0) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-muted-foreground text-lg">
            No students found in {selectedGrade} - {selectedSection}
          </p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%] text-left">Roll No</TableHead>
            <TableHead className="w-[10%] text-left">Name</TableHead>
            <TableHead className="w-[5%] text-left">Admn No</TableHead>
            <TableHead className="w-[10%] text-left">DOB</TableHead>
            <TableHead className="w-[10%] text-left">Father's Name</TableHead>
            <TableHead className="w-[10%] text-left">Mother's Name</TableHead>
            <TableHead className="w-[5%] text-left">Phone</TableHead>
            <TableHead className="w-[5%] text-left">Alternate Phone</TableHead>
            <TableHead className="w-[15%] text-left">Address</TableHead>
            <TableHead className="w-[5%] text-left">Gender</TableHead>
            <TableHead className="w-[10%] text-left">Blood Group</TableHead>
            {/* <TableHead className="w-[5%] text-left">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-left">{item.serialNO}</TableCell>
              <TableCell className="text-left">{item.name}</TableCell>
              <TableCell className="text-left">{item.rollNO}</TableCell>
              <TableCell className="text-left">
                {item.dob && item.dob.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-left">{item.fathersName}</TableCell>
              <TableCell className="text-left">{item.mothersName}</TableCell>
              <TableCell className="text-left">{item.phone}</TableCell>
              <TableCell className="text-left">{item.alternatePhone}</TableCell>
              <TableCell className="text-left">{item.address}</TableCell>
              <TableCell className="text-left">{item.gender}</TableCell>
              <TableCell className="text-left">{item.bloodGroup}</TableCell>
              {/* <TableCell className="text-left">
                  <ActionButton
                    handleClick={handleEdit}
                    disabled={actiondisabled}
                    id={item.rollNO}
                    variant="edit"
                  />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-purple-200 tracking-wide font-bold text-xl">
          Your Students
        </h1>
        <div className="gap-4 flex">
          <PlusIconButton href="/admin/addstudent" title="Add Student" />
          <PlusIconButton
            href="/admin/bulkstudentupload"
            title="Add Bulk Student"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <div className="w-[400px]">
          <Select
            onValueChange={(value) => setSelectedGrade(value)}
            value={selectedGrade}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(GradeName).map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-[400px]">
          <Select
            onValueChange={(value) => setSelectedSection(value)}
            value={selectedSection}
            disabled={!selectedGrade}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(SECTION).map((section) => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default page;

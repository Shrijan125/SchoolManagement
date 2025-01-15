import MarkAttendanceForm from '@/components/forms/mark-attendance-form';
import React from 'react';

const page = () => {
  return (
    <div className="px-4 w-[600px] mx-auto">
      <h1 className="text-2xl text-purple-200 tracking-wide font-bold">
        Mark Today&#39;s Attendance!
      </h1>
      <span className="text-xs sm:text-sm text-purple-400 tracking-wide">
        Provide the name of absentees.
      </span>
      <div className="mt-4">
        <MarkAttendanceForm></MarkAttendanceForm>
      </div>
    </div>
  );
};

export default page;

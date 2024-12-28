import AddStudentForm from '@/components/forms/add-student-form';
import React from 'react';

const page = () => {
  return (
    <div className="px-4 w-[600px] mx-auto">
      <h1 className="text-2xl text-purple-200 tracking-wide font-bold">
        New Student On Board!
      </h1>
      <span className="text-xs sm:text-sm text-purple-400 tracking-wide">
        Provide the relevant details.
      </span>
      <div className="mt-4">
        <AddStudentForm></AddStudentForm>
      </div>
    </div>
  );
};

export default page;

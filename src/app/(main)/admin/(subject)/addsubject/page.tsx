import AddSubjectForm from '@/components/forms/add-subject-form';
import React from 'react';

const page = () => {
  return (
    <div className="px-4 w-[600px] mx-auto">
      <h1 className="text-2xl text-purple-200 tracking-wide font-bold">
        Add Subjects to Your Curriculum !
      </h1>
      <span className="text-xs sm:text-sm text-purple-400 tracking-wide">
        Provide the relevant details.
      </span>
      <div className="mt-4">
        <AddSubjectForm defcategory='' defname=''></AddSubjectForm>
      </div>
    </div>
  );
};

export default page;

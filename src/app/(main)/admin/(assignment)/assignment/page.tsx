import CreateAssignmentForm from '@/components/forms/create-assignment-form';
import React from 'react';

const page = () => {
  return (
    <div className="px-4 w-[600px] mx-auto">
      <h1 className="text-2xl text-purple-200 tracking-wide font-bold">
        Create Today&#39;s Assignment!
      </h1>
      <span className="text-xs sm:text-sm text-purple-400 tracking-wide">
        Define the task.
      </span>
      <div className="mt-4">
        <CreateAssignmentForm></CreateAssignmentForm>
      </div>
    </div>
  );
};

export default page;

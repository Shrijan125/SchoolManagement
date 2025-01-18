import ResetPasswordForm from '@/components/forms/reset-password-form';
import React from 'react';

const page = () => {
  return (
    <div className="px-4 w-[600px] mx-auto">
      <h1 className="text-2xl text-purple-200 tracking-wide font-bold">
        Reset Your Password!
      </h1>
      <span className="text-xs sm:text-sm text-purple-400 tracking-wide">
        Enter and confirm your new password.
      </span>
      <div className="mt-4">
        <ResetPasswordForm></ResetPasswordForm>
      </div>
    </div>
  );
};

export default page;

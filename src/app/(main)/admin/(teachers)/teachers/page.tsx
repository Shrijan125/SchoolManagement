// 'use client';
import PlusIconButton from '@/components/custom-buttons/plus-icon-button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-purple-200 tracking-wide font-bold text-xl">
          Your Teachers
        </h1>
        <PlusIconButton
          href="/admin/addteacher"
          title="Add Teacher"
        ></PlusIconButton>
      </div>
    </div>
  );
};

export default page;

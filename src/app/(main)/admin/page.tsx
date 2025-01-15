import CustomSidebarTrigger from '@/components/sidebar/sidebar-trigger';
import React from 'react';

const page = () => {
  return (
    <>
      <CustomSidebarTrigger
        link1=""
        title1=""
        title2="Admin"
      ></CustomSidebarTrigger>
      <div className="mx-auto text-purple-300 text-center">
        This page is under maintainenace!
      </div>
    </>
  );
};

export default page;

import CustomSidebarTrigger from '@/components/sidebar/sidebar-trigger';
import React from 'react';

const page = () => {
  return (
    <>
      <CustomSidebarTrigger
        link1="/admin"
        title1="Admin"
        title2="teachers"
      ></CustomSidebarTrigger>
    </>
  );
};

export default page;

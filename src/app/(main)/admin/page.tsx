import { AbsentStudentBarChart } from '@/components/charts/absent-student-barchart';
import { TotalStudentsPieChart } from '@/components/charts/total-studetnts-piechart';
import CustomSidebarTrigger from '@/components/sidebar/sidebar-trigger';
import React from 'react';

const page = () => {
  return (
    <>
      <CustomSidebarTrigger
        link1="/admin"
        title1="Admin"
      ></CustomSidebarTrigger>
      <div className="px-4">
        <div className="flex flex-col w-[80%] gap-8 mx-auto">
          <TotalStudentsPieChart></TotalStudentsPieChart>
          <AbsentStudentBarChart></AbsentStudentBarChart>
        </div>
      </div>
    </>
  );
};

export default page;

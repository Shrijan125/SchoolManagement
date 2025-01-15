'use client';
import GenerateResultForm from '@/components/forms/generate-pdf-form';
import SecondaryResult, {
  SecondaryResultProps,
} from '@/components/results/secondary-result';
import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';

const sampleSecondaryResult: SecondaryResultProps = {
  name: 'John Doe',
  admNo: '12345',
  serNo: '001',
  grade: '10',
  section: 'A',
  session: '2024-2025',
  english: {
    ppt1: 4,
    ppt2: 5,
    ppt3: 4,
    avgppt: 4.5,
    multassm: 5,
    pf: 4,
    sea: 5,
    totalabc: 18.5,
    annex: 75,
    grandTotal: 93.5,
    grade: 'A',
  },
  hindi: {
    ppt1: 4,
    ppt2: 3,
    ppt3: 4,
    avgppt: 4,
    multassm: 4,
    pf: 5,
    sea: 4,
    totalabc: 17,
    annex: 70,
    grandTotal: 87,
    grade: 'B+',
  },
  maths: {
    ppt1: 5,
    ppt2: 5,
    ppt3: 5,
    avgppt: 5,
    multassm: 5,
    pf: 5,
    sea: 5,
    totalabc: 20,
    annex: 80,
    grandTotal: 100,
    grade: 'A+',
  },
  science: {
    ppt1: 3,
    ppt2: 4,
    ppt3: 4,
    avgppt: 4,
    multassm: 4,
    pf: 4,
    sea: 5,
    totalabc: 17,
    annex: 65,
    grandTotal: 82,
    grade: 'B',
  },
  sst: {
    ppt1: 4,
    ppt2: 4,
    ppt3: 5,
    avgppt: 4.5,
    multassm: 5,
    pf: 4,
    sea: 5,
    totalabc: 18.5,
    annex: 75,
    grandTotal: 93.5,
    grade: 'A',
  },
  informationTechnology: {
    practical: 20,
    viva: 15,
    project: 25,
    portfolio: 10,
    annexam: 30,
    total: 100,
    grade: 'A+',
  },
  maxMarks: 600,
  marksObtained: 556,
  percentage: '92.67%',
  overallGrade: 'A+',
  rank: '1',
};

const page = () => {
  return (
    <div className="px-4 w-[600px] mx-auto">
      <h1 className="text-2xl text-purple-200 tracking-wide font-bold">
        Generate Result!
      </h1>
      <span className="text-xs sm:text-sm text-purple-400 tracking-wide">
        Generate result for the selected class.
      </span>
      <div className="mt-4">
        <GenerateResultForm></GenerateResultForm>
      </div>
      <div className="p-4">
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
          <SecondaryResult data={[sampleSecondaryResult]} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default page;

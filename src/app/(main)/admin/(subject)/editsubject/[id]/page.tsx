'use client';
import { getSubjectById } from '@/app/server-actions/subjects/subjects';
import AddSubjectForm from '@/components/forms/add-subject-form';
import Loader from '@/components/loader';
import { useToast } from '@/hooks/use-toast';
import { Category, Subject } from '@prisma/client';
import React, { useEffect, useState } from 'react';

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<Subject>();
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [updateId, setUpdateId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    setDataLoading(true);
    params.then((resolvedParams) => {
      setUpdateId(resolvedParams.id);
      getSubjectById({ id: resolvedParams.id }).then((response) => {
        if (response.data) {
          setData(response.data);
          setError('');
        }
        if (response.error) {
          setError(response.error);
          toast({ description: response.error, variant: 'destructive' });
        }
        setDataLoading(false);
      });
    });
  }, [params]);

  return (
    <div className="px-4">
      <h1 className="text-purple-200 tracking-wide font-bold text-xl">
        Edit Subject
      </h1>
      <div
        className={`transition-opacity duration-500 ${
          dataLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-auto">
          <Loader />
        </div>
      </div>
      <div
        className={`transition-opacity duration-500 delay-300 ${
          dataLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {error ? (
          <div className="text-red-500 font-semibold mt-4">{error}</div>
        ) : (
          <div className="px-4 w-[600px] mx-auto">
            {data?.category} {data?.name}
            <AddSubjectForm
              defcategory={data?.category || ''}
              defname={data?.name || ''}
              update={updateId}
            ></AddSubjectForm>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

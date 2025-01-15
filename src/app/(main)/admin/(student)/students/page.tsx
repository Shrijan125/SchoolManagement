'use client';
import PlusIconButton from '@/components/custom-buttons/plus-icon-button';
// import React, {useState } from 'react';
// import { Student } from '@prisma/client';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/hooks/use-toast';

const page = () => {
  // const [data, setData] = useState<Student[]>();
  // const [dataLoading, setDataLoading] = useState<boolean>(true);
  // const [disabled, setDisabled] = useState<boolean>(false);
  // const router = useRouter();
  // const { toast } = useToast();

  // //   useEffect(() => {
  //     setDataLoading(true);
  //     getSubject().then((response) => {
  //       if (response.data) {
  //         setData(response.data);
  //       }
  //       if (response.error) {
  //         toast({ description: response.error, variant: 'destructive' });
  //       }
  //       setDataLoading(false);
  //     });
  //   }, []);

  //   const handleEdit = ({ id }: { id: string }) => {
  //     setDisabled(true);
  //     router.push(`/admin/editsubject/${id}`);
  //     setDisabled(false);
  //   };

  //   const handleDelete = async ({ id }: { id: string }) => {
  //     setDisabled(true);
  //     const response = await deleteSubject({ id });
  //     if (response.error) {
  //       toast({ description: response.error, variant: 'destructive' });
  //     }
  //     if (response.success) {
  //       setData(data?.filter((item) => item.id !== id));
  //       toast({ description: 'Subject Deleted' });
  //     }
  //     setDisabled(false);
  //   };

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-purple-200 tracking-wide font-bold text-xl">
          Your Students
        </h1>
        <div className="gap-4 flex">
          <PlusIconButton
            href="/admin/addstudent"
            title="Add Student"
          ></PlusIconButton>
          <PlusIconButton
            href="/admin/bulkstudentupload"
            title="Add Bulk Student"
          ></PlusIconButton>
        </div>
      </div>
      {/* <div
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
      > */}
      {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3 text-left">Subject</TableHead>
              <TableHead className="w-1/3 text-left">Category</TableHead>
              <TableHead className="w-1/3 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-left">{item.name}</TableCell>
                <TableCell className="text-left">{item.}</TableCell>
                <TableCell className="text-left">
                  <div className="flex justify-start gap-2">
                    <ActionButton
                      handleClick={handleEdit}
                      disabled={disabled}
                      id={item.id}
                      variant="edit"
                    />
                    <ActionButton
                      handleClick={handleDelete}
                      id={item.id}
                      disabled={disabled}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      {/* </div> */}
    </div>
  );
};

export default page;

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Logo from '../../../public/logo_cropped.png';
import SignInForm from '@/components/forms/signin-form';

const page = () => {
  return (
    <div>
      <Card className="sm:w-[500px] sm:h-[600px] w-[350px] h-[450px]  flex items-center flex-col mx-auto mt-20">
        <CardHeader className="flex items-center">
          <CardTitle>
            <div className="relative sm:w-32 sm:h-32 h-20 w-20">
              <Image src={Logo} className="object-cover" alt="logo"></Image>
            </div>
          </CardTitle>
          <CardDescription className="sm:pt-4 pt-2 text-purple-200 select-none">
            Your Vision. Our Code
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <SignInForm></SignInForm>
        </CardContent>
        <CardFooter className="select-none">
          <p className="text-purple-200 sm:text-sm text-xs whitespace-nowrap">
            &copy; 2024 Shrijan Shreshth. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;

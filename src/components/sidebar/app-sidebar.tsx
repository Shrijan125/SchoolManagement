'use client';

import * as React from 'react';
import { CalendarCheckIcon, ClipboardList, UserRound } from 'lucide-react';

import Logo from '../../../public/logo_cropped.png';

import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const data = {
  navMain: [
    // {
    //   title: 'Teachers',
    //   url: '/admin/teachers',
    //   icon: GraduationCap,
    //   isActive: true,
    // },
    // {
    //   title: 'Subjects',
    //   url: '/admin/subjects',
    //   icon: BookType,
    // },
    {
      title: 'Students',
      url: '/admin/students',
      icon: UserRound,
    },
    // {
    //   title: 'Results',
    //   url: '/admin/generateresult',
    //   icon: Settings2,
    // },
    {
      title: 'Attendance',
      url: '/admin/attendance',
      icon: CalendarCheckIcon,
    },
    {
      title: 'Assignment',
      url: '/admin/assignment',
      icon: ClipboardList,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const session = useSession();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu onClick={() => router.push('/admin')}>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-full"
            >
              <Image src={Logo} alt="Logo" width={50} height={50} />
              <div className="flex flex-col font-bold tracking-wide">
                <span>DevAxis</span>
                <span className="text-purple-200">Your Vision, Our Code</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          name={session.data?.user.name || ''}
          email={session.data?.user.email || ''}
          avatar={''}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

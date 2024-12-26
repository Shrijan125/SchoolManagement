'use client';

import * as React from 'react';
import { BookOpen, BookType, GraduationCap, Settings2 } from 'lucide-react';

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

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Teachers',
      url: '/admin/teachers',
      icon: GraduationCap,
      isActive: true,
    },
    {
      title: 'Subjects',
      url: '/admin/subjects',
      icon: BookType,
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu onClick={() => router.push('/admin')}>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-full"
              onClick={() => console.log('clicked')}
            >
              <Image src={Logo} alt="Logo" width={50} height={50} />
              <div className='flex flex-col font-bold tracking-wide'>
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

import CustomSidebarTrigger from '@/components/sidebar/sidebar-trigger';
import { SidebarInset } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarInset>
      <CustomSidebarTrigger
        link1="/admin/students"
        title1="Your Students"
        title2="Add Bulk Student"
      ></CustomSidebarTrigger>
      {children}
    </SidebarInset>
  );
};

export default Layout;

import CustomSidebarTrigger from '@/components/sidebar/sidebar-trigger';
import { SidebarInset } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarInset>
      <CustomSidebarTrigger
        link1="/admin/teachers"
        title1="Your Teachers"
        title2="Add Teacher"
      ></CustomSidebarTrigger>
      {children}
    </SidebarInset>
  );
};

export default Layout;

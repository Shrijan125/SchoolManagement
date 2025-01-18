import CustomSidebarTrigger from '@/components/sidebar/sidebar-trigger';
import { SidebarInset } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarInset>
      <CustomSidebarTrigger
        link1="/admin"
        title1="Admin"
        title2="Reset Password"
      ></CustomSidebarTrigger>
      {children}
    </SidebarInset>
  );
};

export default Layout;

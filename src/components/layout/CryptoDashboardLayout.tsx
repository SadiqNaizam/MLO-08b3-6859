import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface CryptoDashboardLayoutProps {
  children: React.ReactNode;
  title?: string; // Title prop is optional and can be used for setting document.title or displaying in header
  className?: string;
}

const CryptoDashboardLayout: React.FC<CryptoDashboardLayoutProps> = ({
  children,
  // title, // Example usage: useEffect(() => { document.title = title || 'Velzon Dashboard'; }, [title]);
  className
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true); // Example state for collapsible sidebar

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  // For this version, sidebar is fixed width based on layout requirements.
  // The isSidebarOpen state and toggleSidebar are placeholders for future responsive/collapsible behavior.

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <SidebarNav className="fixed top-0 left-0 h-full z-30 w-64 hidden lg:flex" />
      <TopHeader 
        className="fixed top-0 left-0 lg:left-64 right-0 h-16 z-20"
        onToggleSidebar={toggleSidebar} 
      />
      {/* Mobile sidebar overlay (example for future use) */}
      {/* {isSidebarOpen && <SidebarNav className="fixed top-0 left-0 h-full z-30 w-64 flex lg:hidden" />} */}
      
      <main className="lg:ml-64 mt-16 p-6 min-w-0 overflow-y-auto">
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default CryptoDashboardLayout;

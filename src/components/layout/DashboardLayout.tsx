
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardLayout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`flex-1 overflow-auto p-4 md:p-6 bg-gray-50 transition-all duration-300`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

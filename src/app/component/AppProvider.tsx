'use client'
import { useState } from "react";
import Nav from "./navbar";
import Sidebar from "./sidebar";

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <Nav onOpenSidebar={openSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      {children}
    </>
  );
}

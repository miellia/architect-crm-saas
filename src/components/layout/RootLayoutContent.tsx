"use client";

import { usePathname } from 'next/navigation';
import SideNavBar from './SideNavBar';
import { StoreInitializer } from '../shared/StoreInitializer';
import { NewRecordModal } from '../shared/NewRecordModal';
import React from 'react';

interface RootLayoutContentProps {
  children: React.ReactNode;
  topBar: React.ReactNode;
}

export default function RootLayoutContent({ children, topBar }: RootLayoutContentProps) {
  const pathname = usePathname();
  
  // Public routes that don't need the dashboard shell
  const isPublicRoute = ['/', '/sign-in', '/sign-up'].some(route => 
    pathname === route || pathname?.startsWith(route + '/')
  );

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <StoreInitializer />
      <NewRecordModal />
      <SideNavBar />
      <main className="md:ml-64 min-h-screen">
        {topBar}
        <div className="pt-24 pb-12 px-4 md:px-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </>
  );
}

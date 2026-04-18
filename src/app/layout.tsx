import type { Metadata } from 'next';
import './globals.css';
import SideNavBar from '@/components/layout/SideNavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import { StoreInitializer } from '@/components/shared/StoreInitializer';
import { NewRecordModal } from '@/components/shared/NewRecordModal';
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Architect CRM',
  description: 'Enterprise CRM for Architectural Firms',
};

import RootLayoutContent from '@/components/layout/RootLayoutContent';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="light relative">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body suppressHydrationWarning className="bg-surface font-body text-on-surface antialiased">
          <ClerkLoading>
            <div className="flex h-screen w-full flex-col gap-4 items-center justify-center bg-surface-container-lowest">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-primary font-bold animate-pulse">Booting Secure Workspace...</span>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <RootLayoutContent topBar={<TopNavBar />}>
              {children}
            </RootLayoutContent>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}

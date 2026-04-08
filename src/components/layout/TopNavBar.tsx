import { Search } from 'lucide-react';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { NavbarActions } from './NavbarActions';
import { MobileMenuButton } from './MobileMenuButton';

export default async function TopNavBar() {
  const { userId } = await auth();
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b border-slate-200 dark:border-slate-800 flex justify-between items-center h-16 px-4 md:px-6">
      <div className="flex items-center gap-4 md:gap-6">
        <MobileMenuButton />
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 w-80 max-w-md">
          <Search size={16} className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search Architect CRM..."
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-500 font-medium text-slate-800 dark:text-slate-200 outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <NavbarActions />
        <div className="flex items-center justify-center">
          {userId ? (
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-9 h-9 shadow-sm" } }} />
          ) : (
            <SignInButton mode="modal">
              <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}

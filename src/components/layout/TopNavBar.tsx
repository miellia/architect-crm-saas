import { Menu, Search, Bell, HelpCircle, Grip } from 'lucide-react';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
export default async function TopNavBar() {
  const { userId } = await auth();
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b border-slate-200 dark:border-slate-800 flex justify-between items-center h-16 px-6">
      <div className="flex items-center gap-6">
        <button className="md:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-md transition-colors">
          <Menu size={20} />
        </button>
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 w-80 max-w-md">
          <Search size={16} className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search Architect CRM..."
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-500 font-medium text-slate-800 dark:text-slate-200 outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-950"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <HelpCircle size={20} />
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors mr-2">
          <Grip size={20} />
        </button>
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

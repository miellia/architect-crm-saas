"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, LayoutDashboard, Users, Handshake, BarChart, Settings, Plus } from 'lucide-react';
import { useCrmStore } from '@/store/useCrmStore';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/contacts', label: 'Contacts', icon: Users },
  { href: '/deals', label: 'Deals', icon: Handshake },
  { href: '#', label: 'Reports', icon: BarChart, disabled: true },
  { href: '#', label: 'Settings', icon: Settings, disabled: true },
];

export default function SideNavBar() {
  const pathname = usePathname();
  const setNewRecordModalOpen = useCrmStore((state) => state.setNewRecordModalOpen);

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-100 dark:bg-slate-950 hidden md:flex flex-col gap-2 p-4 border-r border-slate-200 dark:border-slate-800 z-40">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
          <Building2 size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black text-blue-800 dark:text-blue-300 font-headline tracking-tight">
            Architect
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold leading-none">
            Enterprise
          </p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;

          if (item.disabled) {
            return (
              <span
                key={item.label}
                className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 rounded-md transition-all group pointer-events-none opacity-50"
              >
                <Icon size={20} className="text-slate-500" />
                <span className="font-semibold text-sm">{item.label}</span>
              </span>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                isActive
                  ? "flex items-center gap-3 px-3 py-2.5 bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-800 rounded-md transition-all group"
                  : "flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 rounded-md transition-all group"
              }
            >
              <Icon
                size={20}
                className={
                  isActive
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-slate-500 group-hover:text-primary transition-colors"
                }
              />
              <span
                className={
                  isActive
                    ? "font-bold text-sm bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent"
                    : "font-semibold text-sm"
                }
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => setNewRecordModalOpen(true)}
        className="mt-auto bg-gradient-to-r from-primary to-primary-dim hover:from-primary-dim hover:to-primary text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex flex-row items-center justify-center gap-2 border border-primary-dim/20"
      >
        <Plus size={18} strokeWidth={3} />
        New Record
      </button>
    </aside>
  );
}

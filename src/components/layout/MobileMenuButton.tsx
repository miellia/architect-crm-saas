"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Handshake, BarChart, Settings, Plus, Building2 } from 'lucide-react';
import { useCrmStore } from '@/store/useCrmStore';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/contacts', label: 'Contacts', icon: Users },
  { href: '/deals', label: 'Deals', icon: Handshake },
  { href: '#', label: 'Reports', icon: BarChart, disabled: true },
  { href: '#', label: 'Settings', icon: Settings, disabled: true },
];

export function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const setNewRecordModalOpen = useCrmStore((state) => state.setNewRecordModalOpen);

  // Ensure portal only renders on client
  useEffect(() => { setMounted(true); }, []);

  // Close drawer on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const drawer = (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[80] md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-100 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-[90] md:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary">
              <Building2 size={20} />
            </div>
            <h1 className="text-lg font-black text-blue-800 dark:text-blue-300 font-headline tracking-tight">
              Architect
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;

            if (item.disabled) {
              return (
                <span
                  key={item.label}
                  className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 rounded-md pointer-events-none opacity-50"
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
                onClick={() => setIsOpen(false)}
                className={
                  isActive
                    ? "flex items-center gap-3 px-3 py-2.5 bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-800 rounded-md transition-all"
                    : "flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 rounded-md transition-all"
                }
              >
                <Icon
                  size={20}
                  className={isActive ? "text-blue-700 dark:text-blue-400" : "text-slate-500"}
                />
                <span className={isActive ? "font-bold text-sm" : "font-semibold text-sm"}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* New Record Button */}
        <div className="p-4">
          <button
            onClick={() => { setNewRecordModalOpen(true); setIsOpen(false); }}
            className="w-full bg-gradient-to-r from-primary to-primary-dim hover:from-primary-dim hover:to-primary text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex flex-row items-center justify-center gap-2 border border-primary-dim/20"
          >
            <Plus size={18} strokeWidth={3} />
            New Record
          </button>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-md transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Portal the drawer to document.body so it escapes the header stacking context */}
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}

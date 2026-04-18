"use client";

import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';

export default function LandingNavbar() {
  const { userId } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Building2 size={24} />
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 font-headline tracking-tight">
                Architect
              </span>
              <span className="ml-1 text-[10px] uppercase tracking-widest text-primary font-bold">
                Enterprise
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {userId ? (
              <Link
                href="/dashboard"
                className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/25 hover:bg-primary-dim hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

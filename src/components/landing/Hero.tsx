"use client";

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { ChevronRight, LayoutDashboard, Building2, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const { userId } = useAuth();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-tertiary/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-bold text-primary uppercase tracking-widest">v2.0 Now Live</span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 font-headline tracking-tight mb-8 leading-[1.1]">
          Manage Architecture Projects <br />
          <span className="bg-gradient-to-r from-primary via-primary-dim to-secondary bg-clip-text text-transparent">
            Efficiently.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 font-medium mb-12 leading-relaxed">
          A scalable platform to organize, track, and manage architectural workflows. 
          Built for modern firms that demand precision and performance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          {userId ? (
            <Link
              href="/dashboard"
              className="group bg-primary text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/25 hover:bg-primary-dim hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2"
            >
              <LayoutDashboard size={20} />
              View Your Dashboard
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <>
              <Link
                href="/sign-up"
                className="group bg-primary text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/25 hover:bg-primary-dim hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2"
              >
                Get Started for Free
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/sign-in"
                className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 border-t border-slate-100 italic font-medium text-slate-400 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Building2 size={16} />
            Enterprise Ready
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck size={16} />
            Secure by Default
          </div>
          <div className="hidden md:flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
              ))}
            </div>
            500+ Firms Trust Us
          </div>
        </div>
      </div>
    </section>
  );
}

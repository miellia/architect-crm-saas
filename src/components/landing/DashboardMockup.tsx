"use client";

import Image from 'next/image';

export default function DashboardMockup() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Product Experience</h2>
          <p className="text-3xl lg:text-4xl font-black text-slate-900 font-headline tracking-tight">
            Designed for Precision Architectural Management.
          </p>
        </div>

        {/* Real Screenshot Preview */}
        <div className="relative max-w-5xl mx-auto border border-slate-200 rounded-[2rem] p-4 bg-white shadow-2xl shadow-primary/10 animate-in fade-in slide-in-from-bottom-8 duration-1000 overflow-hidden">
          <div className="rounded-[1.5rem] overflow-hidden border border-slate-200 aspect-[16/10] relative">
            <Image 
              src="/dashboard-preview.png" 
              alt="Architect CRM Dashboard Preview" 
              fill
              className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
              priority
            />
          </div>

          {/* Floating Branding Mockup */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary rounded-full shadow-2xl flex items-center justify-center text-white text-2xl font-bold border-4 border-white">
            +
          </div>
        </div>
      </div>
    </section>
  );
}

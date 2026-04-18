"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-primary/95 flex items-center justify-center -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dim opacity-90"></div>
        <div className="w-[80%] h-[80%] bg-white/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-black text-white font-headline tracking-tight mb-8 leading-tight">
          Start building smarter <br /> workflows today.
        </h2>
        
        <p className="max-w-xl mx-auto text-primary-fixed/80 text-lg font-medium mb-12">
          Join hundreds of leading architectural firms already using Architect Enterprise to manage their global operations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="group bg-white text-primary px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-black/10 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2"
          >
            Create Your Account
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/sign-in"
            className="text-white font-bold px-8 py-4 hover:bg-white/10 rounded-2xl transition-all"
          >
            Contact Sales
          </Link>
        </div>
      </div>

      {/* Mini Footer */}
      <div className="mt-24 border-t border-white/10 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-xs font-bold uppercase tracking-widest">
        <div>© 2026 Architect Enterprise CRM. All rights reserved.</div>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
        </div>
      </div>
    </section>
  );
}

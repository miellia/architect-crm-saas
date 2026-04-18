"use client";

import LandingNavbar from '@/components/landing/LandingNavbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import DashboardMockup from '@/components/landing/DashboardMockup';
import CTASection from '@/components/landing/CTASection';

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <LandingNavbar />
      <main>
        <Hero />
        <DashboardMockup />
        <Features />
        <CTASection />
      </main>
    </div>
  );
}

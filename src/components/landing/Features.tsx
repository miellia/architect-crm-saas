"use client";

import { FolderKanban, Activity, BarChart3, Palette } from 'lucide-react';

const features = [
  {
    title: "Project Management",
    description: "Keep all your architectural projects organized in one central hub with intuitive tracking.",
    icon: FolderKanban,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Workflow Tracking",
    description: "Monitor every step of your process from initial sketches to final blueprints with ease.",
    icon: Activity,
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Scalable Architecture",
    description: "Built on enterprise-grade infrastructure to handle thousands of deals and contacts effortlessly.",
    icon: BarChart3,
    color: "bg-tertiary/10 text-tertiary",
  },
  {
    title: "Clean Dashboard UI",
    description: "A minimalist, high-performance interface designed specifically for architectural professionals.",
    icon: Palette,
    color: "bg-error/10 text-error",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Core Capabilities</h2>
          <p className="text-3xl lg:text-4xl font-black text-slate-900 font-headline tracking-tight">
            Everything you need to <br /> Scale your Firm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-headline">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

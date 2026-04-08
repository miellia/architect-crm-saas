"use client";
import React, { useState } from 'react';
import { Filter, Plus, X } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { KanbanColumn } from '@/components/deals/KanbanColumn';
import { KanbanCard } from '@/components/deals/KanbanCard';
import { useCrmStore } from '@/store/useCrmStore';
import { DealStage } from '@/types';
import { Modal } from '@/components/shared/Modal';
import { DealForm, DealFormData } from '@/components/deals/DealForm';

const stageFilters: { value: DealStage | "all"; label: string }[] = [
  { value: "all", label: "All Stages" },
  { value: "lead", label: "Lead" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal", label: "Proposal" },
  { value: "won", label: "Won" },
];

export default function DealsPipeline() {
  const deals = useCrmStore((state) => state.deals);
  const contacts = useCrmStore((state) => state.contacts);
  const updateDeal = useCrmStore((state) => state.updateDeal);
  const addDeal = useCrmStore((state) => state.addDeal);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<DealStage | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredDeals = activeFilter === "all" ? deals : deals.filter(d => d.stage === activeFilter);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, dealId: string) => {
    e.dataTransfer.setData("dealId", dealId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStage: DealStage) => {
    const dealId = e.dataTransfer.getData("dealId");
    if (dealId) {
      updateDeal(dealId, { stage: newStage });
    }
  };

  const handleCreateDeal = (data: DealFormData) => {
    addDeal(data);
    setIsCreateModalOpen(false);
  };

  const formatCurrency = (val: number) => `$${(val / 1000).toFixed(0)}K`;

  return (
    <>
      <PageHeader
        title="Sales Pipeline"
        subtitle="Manage architectural contracts and enterprise agreements"
      >
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-colors ${
            showFilters || activeFilter !== "all"
              ? "bg-primary text-on-primary"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          {showFilters ? <X size={18} /> : <Filter size={18} />}
          Filter
        </button>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <Plus size={18} strokeWidth={3} />
          New Deal
        </button>
      </PageHeader>

      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {stageFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                activeFilter === f.value
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto pb-6 -mx-2 px-2 h-full">
        {/* Lead (Prospecting) */}
        <KanbanColumn
          title="Prospecting"
          count={filteredDeals.filter(d => d.stage === 'lead').length}
          colorClass="bg-slate-400"
          bgVariant="bg-slate-50/50"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'lead')}
        >
          {filteredDeals.filter(d => d.stage === 'lead').map(deal => (
            <KanbanCard
              key={deal.id}
              draggable
              onDragStart={(e) => handleDragStart(e, deal.id)}
              stageText="New Lead"
              stageColorClass="bg-tertiary-container text-on-tertiary-container"
              dealName={deal.title}
              companyName={contacts.find(c => c.id === deal.contactId)?.company || "Unknown Company"}
              amount={formatCurrency(deal.value)}
            />
          ))}
        </KanbanColumn>

        {/* Qualified (Qualification) */}
        <KanbanColumn
          title="Qualification"
          count={filteredDeals.filter(d => d.stage === 'qualified').length}
          colorClass="bg-blue-400"
          bgVariant="bg-blue-50/50"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'qualified')}
        >
          {filteredDeals.filter(d => d.stage === 'qualified').map(deal => (
            <KanbanCard
              key={deal.id}
              draggable
              onDragStart={(e) => handleDragStart(e, deal.id)}
              stageText="Vetting"
              stageColorClass="bg-blue-100 text-blue-800"
              dealName={deal.title}
              companyName={contacts.find(c => c.id === deal.contactId)?.company || "Unknown Company"}
              amount={formatCurrency(deal.value)}
            />
          ))}
        </KanbanColumn>

        {/* Proposal */}
        <KanbanColumn
          title="Proposal"
          count={filteredDeals.filter(d => d.stage === 'proposal').length}
          colorClass="bg-indigo-500"
          bgVariant="bg-indigo-50/50"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'proposal')}
        >
          {filteredDeals.filter(d => d.stage === 'proposal').map(deal => (
            <KanbanCard
              key={deal.id}
              draggable
              onDragStart={(e) => handleDragStart(e, deal.id)}
              stageText="In Review"
              stageColorClass="bg-indigo-100 text-indigo-800"
              dealName={deal.title}
              companyName={contacts.find(c => c.id === deal.contactId)?.company || "Unknown Company"}
              amount={formatCurrency(deal.value)}
            />
          ))}
        </KanbanColumn>

        {/* Won (Closed Won) */}
        <KanbanColumn
          title="Closed Won"
          count={filteredDeals.filter(d => d.stage === 'won').length}
          colorClass="bg-emerald-500"
          bgVariant="bg-emerald-50/50"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'won')}
        >
          {filteredDeals.filter(d => d.stage === 'won').map(deal => (
            <KanbanCard
              key={deal.id}
              draggable
              onDragStart={(e) => handleDragStart(e, deal.id)}
              stageText="Contract Signed"
              stageColorClass="bg-emerald-100 text-emerald-700"
              dealName={deal.title}
              companyName={contacts.find(c => c.id === deal.contactId)?.company || "Unknown Company"}
              amount={formatCurrency(deal.value)}
              borderColorClass="border-emerald-500"
            />
          ))}
        </KanbanColumn>
      </div>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Deal">
        <DealForm onSubmit={handleCreateDeal} onCancel={() => setIsCreateModalOpen(false)} />
      </Modal>
    </>
  );
}

"use client";
import { Filter, CalendarCheck, Video, Mail, CheckCircle2, UserPlus, Search, X } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { ContactTable } from '@/components/contacts/ContactTable';
import { useCrmStore } from '@/store/useCrmStore';
import { useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { ContactForm, ContactFormData } from '@/components/contacts/ContactForm';

export default function Contacts() {
  const contacts = useCrmStore((state) => state.contacts);
  const deals = useCrmStore((state) => state.deals);
  const addContact = useCrmStore((state) => state.addContact);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateSubmit = (data: ContactFormData) => {
    addContact(data);
    setIsCreateModalOpen(false);
  };

  const activeDealsValue = deals.reduce((acc, deal) => acc + deal.value, 0);

  return (
    <>
      <PageHeader
        title="Contact Management"
        subtitle="Manage your professional relationships and lead pipeline."
      >
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <UserPlus size={18} />
          New Contact
        </button>
        <button
          onClick={() => { setShowFilters(!showFilters); if (showFilters) setSearchQuery(""); }}
          className={`px-4 py-2 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors ${
            showFilters
              ? "bg-primary text-on-primary"
              : "bg-surface-container-lowest text-primary border border-primary/20 hover:bg-primary/5"
          }`}
        >
          {showFilters ? <X size={18} /> : <Filter size={18} />}
          Advanced Filters
        </button>
      </PageHeader>

      {showFilters && (
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 flex items-center bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-primary/20">
            <Search size={16} className="text-on-surface-variant mr-2 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="bg-transparent border-none outline-none text-sm w-full text-on-surface placeholder:text-on-surface-variant"
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-on-surface-variant hover:text-on-surface ml-2">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Leads"
          value={contacts.length.toLocaleString()}
          diffText="In System"
          trend="up"
          borderVariant="primary"
        />
        <StatCard
          label="Conversion Rate"
          value={`${((deals.filter(d => d.stage === 'won').length / Math.max(1, deals.length)) * 100).toFixed(1)}%`}
          diffText="Avg 22%"
          trend="neutral"
          borderVariant="tertiary"
        />
        <StatCard
          label="Pipeline Value"
          value={`$${(activeDealsValue / 1000000).toFixed(1)}M`}
          diffText={`${deals.length} deals`}
          trend="neutral"
          borderVariant="primary"
        />
        <StatCard
          label="Need Attention"
          value="0"
          diffText="Overdue"
          trend="neutral"
          borderVariant="none"
        />
      </div>

      <ContactTable searchQuery={searchQuery} />

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Add New Contact">
        <ContactForm onSubmit={handleCreateSubmit} onCancel={() => setIsCreateModalOpen(false)} />
      </Modal>

      {/* Touchpoints and Weekly Goal Layout */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 glass-panel p-6 rounded-2xl shadow-sm border border-slate-200/50">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CalendarCheck size={20} className="text-primary" />
            Upcoming Touchpoints
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-surface rounded-xl hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary-container text-on-primary-container rounded-lg">
                  <Video size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Demo Call with {contacts[0]?.company || 'Client'}</p>
                  <p className="text-xs text-on-surface-variant">Today at 2:00 PM</p>
                </div>
              </div>
              <button className="text-xs font-bold text-primary hover:underline">Join</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-xl hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-tertiary-container text-on-tertiary-container rounded-lg">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Follow up: Proposal V2</p>
                  <p className="text-xs text-on-surface-variant">Tomorrow, 10:00 AM</p>
                </div>
              </div>
              <button className="text-xs font-bold text-on-surface-variant hover:underline">Draft</button>
            </div>
          </div>
        </div>
        <div className="bg-primary p-6 rounded-2xl text-on-primary shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">Weekly Goal</h3>
            <p className="text-xs text-primary-fixed opacity-80 mb-6">
              You&apos;ve reached 75% of your outreach target.
            </p>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-dim">
                <div
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold">Recommended Actions:</p>
            <ul className="text-xs space-y-2 opacity-90">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                {contacts.length} leads in system
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                Schedule 2 more meetings
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

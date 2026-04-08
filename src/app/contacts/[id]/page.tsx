"use client";
import { Phone, Send, ChevronDown, Mail, Users, Building, Hammer, AtSign, Smartphone, Globe, Edit } from 'lucide-react';
import { TimelineItem } from '@/components/shared/TimelineItem';
import { ContactAvatar } from '@/components/shared/ContactAvatar';
import { AssociatedDeal } from '@/components/contacts/AssociatedDeal';
import { useCrmStore } from '@/store/useCrmStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { ContactForm, ContactFormData } from '@/components/contacts/ContactForm';

export default function ContactDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const contact = useCrmStore(state => state.getContactById(params.id));
  const associatedDeals = useCrmStore(state => state.getDealsByContact(params.id));
  const updateContact = useCrmStore(state => state.updateContact);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold text-on-surface">Contact Not Found</h2>
        <button onClick={() => router.push('/contacts')} className="mt-4 text-primary underline">Return to Contacts</button>
      </div>
    );
  }

  const handleEditSubmit = (data: ContactFormData) => {
    updateContact(contact.id, data);
    setIsEditModalOpen(false);
  };

  const formatCurrency = (val: number) => `$${(val / 1000).toFixed(0)}K`;

  return (
    <>
      <section className="flex flex-col md:flex-row gap-8 mb-10 items-start">
        <div className="relative group">
          <ContactAvatar
            size="xl"
            className="rounded-3xl shadow-sm bg-primary/10"
            textColor="text-primary"
            initials={contact.name.substring(0, 2).toUpperCase()}
          />
          <div className="absolute -bottom-2 -right-2 bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-xs font-bold font-headline shadow-sm">
            VIP CLIENT
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">
                {contact.name}
              </h2>
              <p className="text-lg text-on-surface-variant font-medium mt-1">
                {contact.company}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="bg-gradient-to-r from-primary to-primary-dim hover:from-primary-dim hover:to-primary text-on-primary px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-transform active:scale-95">
                <Phone size={18} />
                Log Call
              </button>
              <button className="bg-surface-container-lowest text-primary px-5 py-2.5 rounded-xl font-semibold border border-outline-variant/20 flex items-center gap-2 shadow-sm hover:bg-surface-container transition-transform active:scale-95">
                <Send size={18} />
                Send Email
              </button>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="bg-surface-container-highest p-2.5 rounded-xl text-primary hover:opacity-80 transition-colors"
                title="Edit Contact"
              >
                <Edit size={20} />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-6">
            {[
              { label: "Phone", value: contact.phone },
              { label: "Email", value: contact.email },
              { label: "Location", value: "Unknown Location" },
              { label: "Added", value: new Date(contact.createdAt).toLocaleDateString() },
            ].map((info, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-bold text-on-surface-variant/60">
                  {info.label}
                </span>
                <span className="text-on-surface font-semibold">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Interaction Timeline */}
          <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold font-headline">Interaction Timeline</h3>
              <button className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
                Filter by type
                <ChevronDown size={16} />
              </button>
            </div>
            <div className="space-y-8 relative">
              <div className="absolute left-[1.125rem] top-2 bottom-2 w-0.5 bg-surface-container"></div>
              <TimelineItem
                icon={<Mail size={16} />}
                iconBgColor="bg-tertiary-container"
                iconTextColor="text-on-tertiary-container"
                title="Email Sent: Project Proposal v2"
                timestamp="Oct 24, 2:15 PM"
                description={`Sent updated estimates for ${contact.company}. Awaiting internal review.`}
                badge="OUTREACH"
              />
              <TimelineItem
                icon={<Phone size={16} />}
                iconBgColor="bg-secondary-container"
                iconTextColor="text-on-secondary-container"
                title="Outgoing Call: Discovery Session"
                timestamp="Oct 22, 11:00 AM"
                description={`Discussed expanding the scope with ${contact.name}. Highly interested.`}
              />
              <TimelineItem
                icon={<Users size={16} />}
                iconBgColor="bg-surface-container"
                iconTextColor="text-on-surface-variant"
                title="Meeting: On-site Walkthrough"
                timestamp="Oct 19, 9:30 AM"
                description="Met at the location. Verified foundation measurements."
              />
            </div>
            <button className="w-full mt-10 py-3 rounded-xl border border-dashed border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors font-medium text-sm">
              View all interactions (3)
            </button>
          </div>
          
          {/* Associated Deals */}
          <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold font-headline">Associated Deals</h3>
              <button className="bg-primary-container text-on-primary-container px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-80 transition-opacity">
                NEW DEAL
              </button>
            </div>
            <div className="space-y-4">
              {associatedDeals.length > 0 ? (
                associatedDeals.map((deal) => (
                  <AssociatedDeal
                    key={deal.id}
                    dealName={deal.title}
                    stageName={`Stage: ${deal.stage.toUpperCase()}`}
                    amount={formatCurrency(deal.value)}
                    confidenceOrPipeline={deal.stage === 'won' ? "Closed!" : "Active"}
                    icon={deal.stage === 'won' ? <Building size={20} /> : <Hammer size={20} />}
                    iconBgColor={deal.stage === 'won' ? "bg-emerald-100" : "bg-primary/10"}
                    iconTextColor={deal.stage === 'won' ? "text-emerald-600" : "text-primary"}
                  />
                ))
              ) : (
                <p className="text-sm text-on-surface-variant p-4 text-center border border-dashed border-outline-variant rounded-xl">
                  No deals associated with this contact yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contextual Data */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container rounded-[2rem] p-8">
            <h3 className="text-lg font-bold font-headline mb-6">Contact Information</h3>
            <div className="space-y-6">
              {[
                { icon: <AtSign size={18} />, title: "Work Email", value: contact.email },
                { icon: <Smartphone size={18} />, title: "Mobile", value: contact.phone },
                { icon: <Globe size={18} />, title: "LinkedIn", value: `in/${contact.name.toLowerCase().replace(" ", "-")}`, valueClass: "text-primary cursor-pointer hover:underline" },
                { icon: <Building size={18} />, title: "Company", value: contact.company },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant shadow-sm shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">{item.title}</p>
                    <p className={`text-sm font-semibold ${item.valueClass || ''}`}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border-2 border-primary-container/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-headline">Internal Notes</h3>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <Edit size={18} />
              </button>
            </div>
            <div className="bg-surface p-5 rounded-2xl min-h-[200px]">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Prefers morning calls before 10 AM. Very focused on sustainability and LEED certification. <br/><br/>
                Mention the New York case study next time we talk.<br/><br/>
                <span className="text-primary font-bold">Key Stakeholder:</span> Has final sign-off for all creative direction.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Edit ${contact.name}`}>
        <ContactForm 
          initialData={contact} 
          onSubmit={handleEditSubmit} 
          onCancel={() => setIsEditModalOpen(false)} 
        />
      </Modal>
    </>
  );
}

"use client";
import { useState } from 'react';
import { Calendar, Download, DollarSign, Handshake, UserPlus, Phone, FileText, Mail, CheckCircle2, MessageSquare, AlertTriangle, Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { TimelineItem } from '@/components/shared/TimelineItem';
import { useCrmStore } from '@/store/useCrmStore';

const dateRanges = [
  { label: "Last 30 Days", days: 30 },
  { label: "Last 60 Days", days: 60 },
  { label: "Last 90 Days", days: 90 },
  { label: "All Time", days: 0 },
];

export default function Dashboard() {
  const deals = useCrmStore(state => state.deals);
  const contacts = useCrmStore(state => state.contacts);
  const setNewRecordModalOpen = useCrmStore(state => state.setNewRecordModalOpen);

  const [dateRangeIndex, setDateRangeIndex] = useState(0);
  const currentRange = dateRanges[dateRangeIndex];

  // Filter contacts/deals by date range
  const cutoffDate = currentRange.days > 0
    ? new Date(Date.now() - currentRange.days * 24 * 60 * 60 * 1000)
    : null;

  const filteredContacts = cutoffDate
    ? contacts.filter(c => new Date(c.createdAt) >= cutoffDate)
    : contacts;

  // Deals don't have createdAt, so show all deals but compute stats from filtered contacts
  const activeDeals = deals.filter(d => d.stage !== 'won').length;
  const totalRevenue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const winRate = deals.length > 0 ? (deals.filter(d => d.stage === 'won').length / deals.length) * 100 : 0;

  const handleCycleDateRange = () => {
    setDateRangeIndex((i) => (i + 1) % dateRanges.length);
  };

  const handleExportData = () => {
    const data = { contacts, deals, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "crm-export.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        title="Performance Overview"
        subtitle="Welcome back, Architect. Here's what's happening today."
      >
        <button
          onClick={handleCycleDateRange}
          className="flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-container-high transition-colors"
        >
          <Calendar size={18} />
          {currentRange.label}
        </button>
        <button
          onClick={handleExportData}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-dim transition-colors"
        >
          <Download size={18} />
          Export Data
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Revenue"
          value={`$${(totalRevenue / 1000).toLocaleString()}K`}
          diffText="Estimated"
          trend="up"
          icon={<DollarSign size={24} />}
        />
        <StatCard
          label="Active Deals"
          value={activeDeals}
          diffText="In Pipeline"
          trend="neutral"
          icon={<Handshake size={24} />}
        />
        <StatCard
          label="Total Contacts"
          value={filteredContacts.length}
          diffText={currentRange.days > 0 ? currentRange.label : "In System"}
          trend="up"
          icon={<UserPlus size={24} />}
        />
        <StatCard
          label="Conversion Rate"
          value={`${winRate.toFixed(1)}%`}
          diffText="Across Stages"
          trend={winRate > 20 ? "up" : "down"}
          borderVariant={winRate > 20 ? "none" : "error"}
          icon={<Handshake size={24} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <section className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-on-surface">
                Sales Performance
              </h3>
              <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary"></span> Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-tertiary-fixed"></span>{" "}
                  Projected
                </span>
              </div>
            </div>
            <div className="h-80 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300">
                <path
                  d="M0 250 Q 100 220 200 240 T 400 150 T 600 100 T 800 80"
                  fill="none"
                  stroke="#465f88"
                  strokeLinecap="round"
                  strokeWidth="4"
                ></path>
                <path
                  d="M0 260 Q 100 240 200 260 T 400 180 T 600 150 T 800 130"
                  fill="none"
                  stroke="#d9d7f8"
                  strokeDasharray="8 4"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
              </svg>
              <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] font-bold text-on-surface-variant uppercase">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
          </section>
          
          <section className="bg-white rounded-xl p-8 border border-outline-variant/10 shadow-sm">
            <h3 className="text-xl font-bold text-on-surface mb-6">Upcoming Tasks</h3>
            <div className="space-y-4">
              {[
                { title: `Follow up with ${contacts[0]?.company || 'Lead' }`, time: "Today at 2:30 PM", icon: <Phone size={18} />, status: "Urgent", statusColor: "bg-tertiary-container text-on-tertiary-container", bgIcon: "bg-tertiary-container", textIcon: "text-on-tertiary-container" },
                { title: "Quarterly Revenue Review", time: "Tomorrow, 10:00 AM", icon: <FileText size={18} />, status: "Internal", statusColor: "bg-surface-container-high text-on-surface-variant", bgIcon: "bg-primary-container", textIcon: "text-on-primary-container" },
                { title: "Email New Campaign Assets", time: "Oct 24, 09:00 AM", icon: <Mail size={18} />, status: "Marketing", statusColor: "bg-surface-container-high text-on-surface-variant", bgIcon: "bg-secondary-container", textIcon: "text-on-secondary-container" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${task.bgIcon} ${task.textIcon}`}>
                      {task.icon}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{task.title}</p>
                      <p className="text-sm text-on-surface-variant">{task.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md ${task.statusColor}`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <section className="bg-surface-dim rounded-xl p-6 h-full flex flex-col shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-on-surface">Recent Activity</h3>
              <button className="text-primary text-xs font-bold hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto">
              <TimelineItem
                compact
                icon={<CheckCircle2 size={16} />}
                iconTextColor="text-primary"
                title={<>Deal Closed: <span className="text-primary font-extrabold">{deals.find(d => d.stage === 'won')?.title || 'Blue Horizon Inc.'}</span></>}
                description="Sarah Jenkins closed the Q4 expansion deal."
                timestamp="2m ago"
              />
              <TimelineItem
                compact
                icon={<UserPlus size={16} />}
                iconTextColor="text-secondary"
                title={<>New Lead: <span className="text-on-surface-variant">{contacts[contacts.length-1]?.name || 'Marcus'}</span></>}
                description="Lead assigned to Alex Rivera for follow-up."
                timestamp="45m ago"
              />
              <TimelineItem
                compact
                icon={<MessageSquare size={16} />}
                iconTextColor="text-tertiary"
                title={<>Comment on <span className="italic">Pipeline Report</span></>}
                description="The conversion data for SE region looks skewed."
                timestamp="3h ago"
              />
              <TimelineItem
                compact
                icon={<AlertTriangle size={16} />}
                iconTextColor="text-error"
                title="Contract Expiring"
                description="NexaCore contract expires in 15 days."
                timestamp="5h ago"
              />
            </div>
            
            <div className="mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <p className="text-xs font-bold text-on-surface-variant mb-2">Team Efficiency</p>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[82%]"></div>
              </div>
              <p className="text-right text-[10px] font-extrabold text-primary mt-1">82% Capacity</p>
            </div>
          </section>
        </div>
      </div>

      <button
        onClick={() => setNewRecordModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50"
      >
        <Plus size={28} />
      </button>
    </>
  );
}

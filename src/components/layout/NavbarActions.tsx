"use client";
import { useState, useEffect, useRef } from 'react';
import { Bell, HelpCircle, Grip, X } from 'lucide-react';

type DropdownId = "notifications" | "help" | "actions" | null;

export function NavbarActions() {
  const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (id: DropdownId) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconBtnBase = "p-2 rounded-full transition-colors";
  const iconBtnIdle = `${iconBtnBase} text-on-surface-variant hover:text-on-surface hover:bg-surface-container`;
  const iconBtnActive = `${iconBtnBase} text-primary bg-surface-container`;

  return (
    <div ref={containerRef} className="flex items-center gap-1">
      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("notifications")}
          className={openDropdown === "notifications" ? iconBtnActive : iconBtnIdle}
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest"></span>
        </button>
        {openDropdown === "notifications" && (
          <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/20 z-50 animate-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/10">
              <h3 className="text-sm font-bold text-on-surface">Notifications</h3>
              <button onClick={() => setOpenDropdown(null)} className="text-on-surface-variant hover:text-on-surface transition-colors">
                <X size={14} />
              </button>
            </div>
            <div className="p-1.5 max-h-64 overflow-y-auto">
              <div className="px-3 py-2.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors">
                <p className="text-sm font-semibold text-on-surface">Deal stage updated</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Blue Horizon moved to Proposal</p>
                <p className="text-[10px] text-on-surface-variant/70 mt-1 font-medium">2 min ago</p>
              </div>
              <div className="px-3 py-2.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors">
                <p className="text-sm font-semibold text-on-surface">New contact added</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Elena Rodriguez joined your pipeline</p>
                <p className="text-[10px] text-on-surface-variant/70 mt-1 font-medium">1 hour ago</p>
              </div>
              <div className="px-3 py-2.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors">
                <p className="text-sm font-semibold text-on-surface">Contract expiring soon</p>
                <p className="text-xs text-on-surface-variant mt-0.5">NexaCore contract expires in 15 days</p>
                <p className="text-[10px] text-on-surface-variant/70 mt-1 font-medium">5 hours ago</p>
              </div>
            </div>
            <div className="px-4 py-2.5 border-t border-outline-variant/10">
              <button className="text-xs font-bold text-primary hover:underline w-full text-center">View all notifications</button>
            </div>
          </div>
        )}
      </div>

      {/* Help */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("help")}
          className={openDropdown === "help" ? iconBtnActive : iconBtnIdle}
        >
          <HelpCircle size={20} />
        </button>
        {openDropdown === "help" && (
          <div className="absolute right-0 top-12 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/20 z-50 animate-in p-1.5">
            <button className="w-full text-left px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
              📖 Documentation
            </button>
            <button className="w-full text-left px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
              💬 Contact Support
            </button>
            <button className="w-full text-left px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
              ⌨️ Keyboard Shortcuts
            </button>
            <div className="border-t border-outline-variant/10 mt-1 pt-1">
              <button className="w-full text-left px-3 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">
                v0.1.0 — Changelog
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Actions / Quick Links */}
      <div className="relative mr-2">
        <button
          onClick={() => toggleDropdown("actions")}
          className={openDropdown === "actions" ? iconBtnActive : iconBtnIdle}
        >
          <Grip size={20} />
        </button>
        {openDropdown === "actions" && (
          <div className="absolute right-0 top-12 w-48 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/20 z-50 animate-in p-1.5">
            <button className="w-full text-left px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
              📊 Reports
            </button>
            <button className="w-full text-left px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
              ⚙️ Settings
            </button>
            <button className="w-full text-left px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
              📥 Import Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

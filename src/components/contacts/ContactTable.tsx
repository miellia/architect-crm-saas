"use client";
import { Phone, Edit, Trash, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { ContactAvatar } from '@/components/shared/ContactAvatar';
import { useCrmStore } from '@/store/useCrmStore';
import { Contact } from '@/types';
import { useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { ContactForm, ContactFormData } from '@/components/contacts/ContactForm';
import Link from 'next/link';

interface ContactTableProps {
  searchQuery?: string;
}

export function ContactTable({ searchQuery = "" }: ContactTableProps) {
  const contacts = useCrmStore((state) => state.contacts);
  const deleteContact = useCrmStore((state) => state.deleteContact);
  const updateContact = useCrmStore((state) => state.updateContact);

  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const filteredContacts = searchQuery
    ? contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contacts;

  const handleEditSubmit = (data: ContactFormData) => {
    if (editingContact) {
      updateContact(editingContact.id, data);
      setEditingContact(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Company", "Created At"];
    const rows = filteredContacts.map((c) => [
      c.name,
      c.email,
      c.phone,
      c.company,
      new Date(c.createdAt).toLocaleDateString(),
    ]);
    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contacts.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/10">
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Contact Name
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Last Contact
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-surface-container-high/40 transition-colors group">
                <td className="px-6 py-4">
                  <Link href={`/contacts/${contact.id}`}>
                    <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
                      <ContactAvatar initials={contact.name.substring(0, 2).toUpperCase()} bgColor="bg-primary/20" textColor="text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-on-surface hover:underline">{contact.name}</p>
                        <p className="text-xs text-on-surface-variant">{contact.email}</p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-on-surface">{contact.company}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-tertiary-container text-on-tertiary-container px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    Lead
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ContactAvatar size="sm" initials="You" bgColor="bg-surface-container-highest" />
                    <span className="text-xs font-medium text-on-surface-variant">You</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Call">
                      <Phone size={18} />
                    </button>
                    <button 
                      onClick={() => setEditingContact(contact)}
                      className="p-2 text-on-surface-variant hover:bg-slate-200 rounded-lg transition-colors" 
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => deleteContact(contact.id)}
                      className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors" 
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredContacts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">
                  {searchQuery ? `No contacts matching "${searchQuery}"` : "No contacts found. Create a new lead to get started."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="px-6 py-4 bg-surface-container-low/50 flex items-center justify-between border-t border-outline-variant/10">
          <button
            onClick={handleExportCSV}
            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
          >
            <Download size={14} />
            Export CSV
          </button>
          <div className="flex gap-4">
            <span className="text-xs text-on-surface-variant font-medium">
              Rows per page: 10
            </span>
            <div className="flex items-center gap-4 text-xs font-bold text-on-surface">
              <span>1 - {filteredContacts.length} of {filteredContacts.length}</span>
              <div className="flex gap-2">
                <ChevronLeft size={18} className="cursor-pointer hover:text-primary transition-colors hover:bg-surface-container rounded" />
                <ChevronRight size={18} className="cursor-pointer hover:text-primary transition-colors hover:bg-surface-container rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={!!editingContact} onClose={() => setEditingContact(null)} title="Edit Contact">
        {editingContact && (
          <ContactForm 
            initialData={editingContact} 
            onSubmit={handleEditSubmit} 
            onCancel={() => setEditingContact(null)} 
          />
        )}
      </Modal>
    </>
  );
}

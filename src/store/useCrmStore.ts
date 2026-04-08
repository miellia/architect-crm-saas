import { create } from 'zustand';
import axios from 'axios';
import { Contact, Deal } from '@/types';

interface CrmState {
  contacts: Contact[];
  deals: Deal[];
  isLoaded: boolean;
  isNewRecordModalOpen: boolean;

  // UI Actions
  setNewRecordModalOpen: (open: boolean) => void;

  // Initialization
  fetchInitialData: () => Promise<void>;

  // Contact Actions
  addContact: (c: Omit<Contact, "id" | "createdAt">) => Promise<void>;
  updateContact: (id: string, c: Partial<Contact>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  getContactById: (id: string) => Contact | undefined;

  // Deal Actions
  addDeal: (d: Omit<Deal, "id">) => Promise<void>;
  updateDeal: (id: string, d: Partial<Deal>) => Promise<void>;
  deleteDeal: (id: string) => Promise<void>;
  getDealsByContact: (contactId: string) => Deal[];
}

export const useCrmStore = create<CrmState>((set, get) => ({
  contacts: [],
  deals: [],
  isLoaded: false,
  isNewRecordModalOpen: false,

  setNewRecordModalOpen: (open) => set({ isNewRecordModalOpen: open }),

  fetchInitialData: async () => {
    if (get().isLoaded) return;

    try {
      const [contactsRes, dealsRes] = await Promise.all([
        axios.get('/api/contacts'),
        axios.get('/api/deals')
      ]);
      set({ contacts: contactsRes.data, deals: dealsRes.data, isLoaded: true });
    } catch {
      // Silent failure on initial load
    }
  },

  addContact: async (c) => {
    try {
      const res = await axios.post('/api/contacts', c);
      set((state) => ({ contacts: [res.data, ...state.contacts] }));
    } catch {
      // Silent failure
    }
  },

  updateContact: async (id, updatedData) => {
    try {
      const res = await axios.put(`/api/contacts/${id}`, updatedData);
      set((state) => ({
        contacts: state.contacts.map((c) => c.id === id ? res.data : c)
      }));
    } catch {
      // Silent failure
    }
  },

  deleteContact: async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      set((state) => ({
        contacts: state.contacts.filter((c) => c.id !== id),
        deals: state.deals.filter((d) => d.contactId !== id)
      }));
    } catch {
      // Silent failure
    }
  },

  getContactById: (id) => {
    return get().contacts.find((c) => c.id === id);
  },

  addDeal: async (d) => {
    try {
      const res = await axios.post('/api/deals', d);
      set((state) => ({ deals: [...state.deals, res.data] }));
    } catch {
      // Silent failure
    }
  },

  updateDeal: async (id, updatedData) => {
    try {
      const res = await axios.put(`/api/deals/${id}`, updatedData);
      set((state) => ({
        deals: state.deals.map((d) => d.id === id ? res.data : d)
      }));
    } catch {
      // Silent failure
    }
  },

  deleteDeal: async (id) => {
    try {
      await axios.delete(`/api/deals/${id}`);
      set((state) => ({
        deals: state.deals.filter((d) => d.id !== id)
      }));
    } catch {
      // Silent failure
    }
  },

  getDealsByContact: (contactId) => {
    return get().deals.filter((d) => d.contactId === contactId);
  }
}));

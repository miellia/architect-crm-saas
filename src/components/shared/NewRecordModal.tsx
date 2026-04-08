"use client";
import { useCrmStore } from "@/store/useCrmStore";
import { Modal } from "@/components/shared/Modal";
import { ContactForm, ContactFormData } from "@/components/contacts/ContactForm";

export function NewRecordModal() {
  const isOpen = useCrmStore((state) => state.isNewRecordModalOpen);
  const setOpen = useCrmStore((state) => state.setNewRecordModalOpen);
  const addContact = useCrmStore((state) => state.addContact);

  const handleSubmit = (data: ContactFormData) => {
    addContact(data);
    setOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} title="Create New Contact">
      <ContactForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
    </Modal>
  );
}

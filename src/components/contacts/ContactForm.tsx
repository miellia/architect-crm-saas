"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Contact } from "@/types";
import { useEffect } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone is required"),
  company: z.string().min(2, "Company is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  initialData?: Contact;
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
}

export function ContactForm({ initialData, onSubmit, onCancel }: ContactFormProps) {
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<ContactFormData>({
    defaultValues: initialData || { name: "", email: "", phone: "", company: "" }
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const validateAndSubmit = (data: ContactFormData) => {
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      // Inject zod errors back into react-hook-form correctly
      result.error.issues.forEach((issue) => {
        setError(issue.path[0] as keyof ContactFormData, {
          type: "manual",
          message: issue.message,
        });
      });
      return;
    }
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit(validateAndSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Full Name</label>
        <input 
          {...register("name")}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
          placeholder="e.g. Elena Rodriguez"
        />
        {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Email</label>
        <input 
          {...register("email")}
          type="email"
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
          placeholder="e.g. elena@example.com"
        />
        {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Phone</label>
        <input 
          {...register("phone")}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Company</label>
        <input 
          {...register("company")}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
          placeholder="Novaspire Tech"
        />
        {errors.company && <p className="text-error text-xs mt-1">{errors.company.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-4 py-2 text-on-surface-variant hover:bg-surface-container rounded-lg font-semibold transition"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition"
        >
          Save Contact
        </button>
      </div>
    </form>
  );
}

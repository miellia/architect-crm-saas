"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCrmStore } from "@/store/useCrmStore";
import { DealStage } from "@/types";

const dealSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  value: z.coerce.number().min(1, "Value must be greater than 0"),
  stage: z.enum(["lead", "qualified", "proposal", "won"] as const),
  contactId: z.string().min(1, "Please select a contact"),
});

export type DealFormData = z.infer<typeof dealSchema>;

interface DealFormProps {
  onSubmit: (data: DealFormData) => void;
  onCancel: () => void;
}

export function DealForm({ onSubmit, onCancel }: DealFormProps) {
  const contacts = useCrmStore((state) => state.contacts);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<DealFormData>({
    defaultValues: { title: "", value: 0, stage: "lead", contactId: "" }
  });

  const validateAndSubmit = (data: DealFormData) => {
    const result = dealSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        setError(issue.path[0] as keyof DealFormData, {
          type: "manual",
          message: issue.message,
        });
      });
      return;
    }
    onSubmit(result.data);
  };

  const stages: { value: DealStage; label: string }[] = [
    { value: "lead", label: "Lead" },
    { value: "qualified", label: "Qualified" },
    { value: "proposal", label: "Proposal" },
    { value: "won", label: "Won" },
  ];

  return (
    <form onSubmit={handleSubmit(validateAndSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Deal Title</label>
        <input
          {...register("title")}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
          placeholder="e.g. Enterprise License Q4"
        />
        {errors.title && <p className="text-error text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Value ($)</label>
        <input
          {...register("value")}
          type="number"
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
          placeholder="50000"
        />
        {errors.value && <p className="text-error text-xs mt-1">{errors.value.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Stage</label>
        <select
          {...register("stage")}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 text-on-surface cursor-pointer"
        >
          {stages.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        {errors.stage && <p className="text-error text-xs mt-1">{errors.stage.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Contact</label>
        <select
          {...register("contactId")}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 text-on-surface cursor-pointer"
        >
          <option value="">Select a contact...</option>
          {contacts.map((c) => (
            <option key={c.id} value={c.id}>{c.name} — {c.company}</option>
          ))}
        </select>
        {errors.contactId && <p className="text-error text-xs mt-1">{errors.contactId.message}</p>}
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
          Create Deal
        </button>
      </div>
    </form>
  );
}

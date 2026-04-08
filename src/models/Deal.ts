import mongoose, { Schema, Document } from 'mongoose';

export interface IDeal extends Document {
  userId: string;
  title: string;
  value: number;
  stage: "lead" | "qualified" | "proposal" | "won";
  contactId: mongoose.Types.ObjectId;
}

const DealSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  value: { type: Number, required: true },
  stage: { 
    type: String, 
    enum: ["lead", "qualified", "proposal", "won"],
    default: "lead",
    required: true
  },
  contactId: { type: Schema.Types.ObjectId, ref: 'Contact', required: true }
});

export default mongoose.models.Deal || mongoose.model<IDeal>('Deal', DealSchema);

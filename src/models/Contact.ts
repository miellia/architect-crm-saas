import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Ensure we don't redefine the model upon hot-reloading
export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

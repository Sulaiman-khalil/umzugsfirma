// backend/src/models/Contact.ts

import { Schema, model } from "mongoose";

interface ContactDocument {
  name: string;
  message: string;
  createdAt: Date;
}

const contactSchema = new Schema<ContactDocument>(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false }
);

export const Contact = model<ContactDocument>("Contact", contactSchema);

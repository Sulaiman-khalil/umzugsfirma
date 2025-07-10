// backend/src/models/Contact.ts

import { Schema, model, Document } from "mongoose";

export interface ContactDocument extends Document {
  name: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<ContactDocument>(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true, // erstellt automatisch createdAt & updatedAt
    versionKey: false, // entfernt das __v-Feld
  }
);

export const Contact = model<ContactDocument>("Contact", contactSchema);

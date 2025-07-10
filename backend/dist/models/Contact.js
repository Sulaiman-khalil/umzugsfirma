"use strict";
// backend/src/models/Contact.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
}, {
    timestamps: true, // erstellt automatisch createdAt & updatedAt
    versionKey: false, // entfernt das __v-Feld
});
exports.Contact = (0, mongoose_1.model)("Contact", contactSchema);

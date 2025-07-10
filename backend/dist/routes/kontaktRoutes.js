"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Contact_1 = require("../models/Contact");
const router = (0, express_1.Router)();
// GET  /kontakt  → alle Nachrichten
router.get("/", async (_req, res, next) => {
    try {
        const alleNachrichten = await Contact_1.Contact.find().sort({ createdAt: -1 });
        res.json(alleNachrichten);
    }
    catch (err) {
        next(err);
    }
});
// POST /kontakt → neue Nachricht anlegen
router.post("/", async (req, res, next) => {
    try {
        const { name, message } = req.body;
        const doc = await Contact_1.Contact.create({ name, message });
        res.json({ success: true, message: "Nachricht gespeichert", data: doc });
    }
    catch (err) {
        next(err);
    }
});
// DELETE /kontakt/:id → Nachricht löschen
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await Contact_1.Contact.findByIdAndDelete(id);
        res.json({ success: true, message: "Nachricht gelöscht" });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;

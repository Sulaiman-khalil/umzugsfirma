// backend/src/routes/kontaktRoutes.ts

import { Router, Request, Response, NextFunction } from "express";
import { Contact } from "../models/Contact";

const router = Router();

// GET  /kontakt  → liefert alle Nachrichten (absteigend nach Datum)
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const alleNachrichten = await Contact.find().sort({ createdAt: -1 });
    res.json(alleNachrichten);
  } catch (err) {
    next(err);
  }
});

// POST /kontakt → speichert eine neue Nachricht
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, message } = req.body;
    const doc = await Contact.create({ name, message });
    console.log("Gespeichert:", doc);
    res.json({ success: true, message: "Nachricht gespeichert!" });
  } catch (err) {
    next(err);
  }
});

export default router;

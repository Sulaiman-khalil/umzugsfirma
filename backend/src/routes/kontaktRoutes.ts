import { Router, Request, Response, NextFunction } from "express";
import { Contact } from "../models/Contact";

const router = Router();

// GET  /kontakt  → alle Nachrichten
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const alleNachrichten = await Contact.find().sort({ createdAt: -1 });
    res.json(alleNachrichten);
  } catch (err) {
    next(err);
  }
});

// POST /kontakt → neue Nachricht anlegen
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, message } = req.body;
    const doc = await Contact.create({ name, message });
    res.json({ success: true, message: "Nachricht gespeichert", data: doc });
  } catch (err) {
    next(err);
  }
});

// DELETE /kontakt/:id → Nachricht löschen
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await Contact.findByIdAndDelete(id);
      res.json({ success: true, message: "Nachricht gelöscht" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

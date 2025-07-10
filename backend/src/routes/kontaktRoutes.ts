// backend/src/routes/kontaktRoutes.ts

import { Router, Request, Response, NextFunction } from "express";
import { Contact } from "../models/Contact";

const router = Router();

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

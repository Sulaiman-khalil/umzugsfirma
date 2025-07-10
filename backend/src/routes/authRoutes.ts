import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

const ADMIN_USER = process.env.ADMIN_USER!;
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH!;
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

router.post("/login", (req: Request, res: Response) => {
  const { user, pass } = req.body;
  if (user !== ADMIN_USER)
    return res.status(401).json({ message: "Invalid credentials" });

  const valid = bcrypt.compareSync(pass, ADMIN_PASS_HASH);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  res.json({ token });
});

export default router;

import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const ADMIN_USER = process.env.ADMIN_USER!;
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH!;
const JWT_SECRET = process.env.JWT_SECRET!;

// 1) Lies den Env-Wert als string ein (oder nutze "1h" als Default)
const expiresInEnv = process.env.JWT_EXPIRES_IN || "1h";

// 2) Baue dir das Options-Objekt und caste nur das expiresIn-Feld
const signOptions: SignOptions = {
  expiresIn: expiresInEnv as SignOptions["expiresIn"],
};

router.post("/login", (req: Request, res: Response) => {
  const { user, pass } = req.body;
  if (user !== ADMIN_USER || !bcrypt.compareSync(pass, ADMIN_PASS_HASH)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 3) Jetzt passt die Überladung von jwt.sign() fehlerfrei
  const token = jwt.sign({ user }, JWT_SECRET, signOptions);
  res.json({ token });
});

export default router;

// backend/src/routes/authRoutes.ts

import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// Env-Variablen (mit „!“ erzwingen, dass sie existieren)
const ADMIN_USER = process.env.ADMIN_USER!;
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH!;
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

interface LoginBody {
  user: string;
  pass: string;
}

router.post(
  "/login",
  async (
    req: Request<{}, {}, LoginBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { user, pass } = req.body;

      if (user !== ADMIN_USER) {
        return res.status(401).json({ message: "Ungültiger User" });
      }

      const pwOk = await bcrypt.compare(pass, ADMIN_PASS_HASH);
      if (!pwOk) {
        return res.status(401).json({ message: "Ungültiges Passwort" });
      }

      // Type Assertion auf SignOptions zwingt das korrekte Overload:
      const token = jwt.sign({ user }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      } as jwt.SignOptions);

      return res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

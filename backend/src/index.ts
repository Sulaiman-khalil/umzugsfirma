import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes";
import kontaktRoutes from "./routes/kontaktRoutes";
import { verifyToken } from "./middleware/auth";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;
dotenv.config();
// MongoDB-Verbindung
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch((err) => {
    console.error("❌ MongoDB-Fehler:", err);
    process.exit(1);
  });

const app = express();
app.use(cors());
app.use(express.json());

// Auth-Route (login)
app.use("/auth", authRoutes);

// Kontakt-Routes: POST bleibt öffentlich, GET + DELETE erfordern Token
app.use(
  "/kontakt",
  (req: Request, res: Response, next: NextFunction) =>
    req.method !== "POST" ? verifyToken(req, res, next) : next(),
  kontaktRoutes
);

// Health-Check
app.get("/", (_req, res) => res.send("🚀 API läuft"));

// Error-Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});

export default app;

// backend/src/index.ts

import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import kontaktRoutes from "./routes/kontaktRoutes";
import { verifyToken } from "./middleware/auth";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

// 1. MongoDB-Verbindung
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch((err) => {
    console.error("❌ MongoDB-Verbindungsfehler:", err);
    process.exit(1);
  });

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Auth-Route für Login (gibt JWT aus)
app.use("/auth", authRoutes);

// 4. Kontakt-Routes: POST bleibt öffentlich, GET ist geschützt
app.use(
  "/kontakt",
  (req: Request, res: Response, next: NextFunction) =>
    req.method === "GET" ? verifyToken(req, res, next) : next(),
  kontaktRoutes
);

// 5. Health-Check-Endpoint
app.get("/", (_req: Request, res: Response) => {
  res.send("🚀 Umzugsfirma-API läuft!");
});

// 6. Globaler Error-Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

// 7. Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});

export default app;

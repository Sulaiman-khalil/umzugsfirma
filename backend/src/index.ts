// backend/src/index.ts

import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import kontaktRoutes from "./routes/kontaktRoutes";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

// 1. MongoDB verbinden
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

// 3. Health-Check-Route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Umzugsfirma-API läuft!");
});

// 4. Kontakt-Route
app.use("/kontakt", kontaktRoutes);

// 5. Globaler Error-Handler
//    _next statt next, typings für Request, Response, NextFunction
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

// 6. Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});

export default app;

// backend/test-db.ts
import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI!;
mongoose
  .connect(uri)
  .then(() => console.log("✅ DB-Verbindung OK"))
  .catch((err) => console.error("❌ DB-Verbindung fehlgeschlagen:", err))
  .finally(() => mongoose.disconnect());

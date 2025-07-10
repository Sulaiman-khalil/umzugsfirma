"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const kontaktRoutes_1 = __importDefault(require("./routes/kontaktRoutes"));
const auth_1 = require("./middleware/auth");
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
dotenv_1.default.config();
// MongoDB-Verbindung
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB verbunden"))
    .catch((err) => {
    console.error("❌ MongoDB-Fehler:", err);
    process.exit(1);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Auth-Route (login)
app.use("/auth", authRoutes_1.default);
// Kontakt-Routes: POST bleibt öffentlich, GET + DELETE erfordern Token
app.use("/kontakt", (req, res, next) => req.method !== "POST" ? (0, auth_1.verifyToken)(req, res, next) : next(), kontaktRoutes_1.default);
// Health-Check
app.get("/", (_req, res) => res.send("🚀 API läuft"));
// Error-Handler
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
});
app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
exports.default = app;

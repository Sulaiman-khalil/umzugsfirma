"use strict";
// backend/src/routes/authRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
// Env-Variablen (mit „!“ erzwingen, dass sie existieren)
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
router.post("/login", async (req, res, next) => {
    try {
        const { user, pass } = req.body;
        if (user !== ADMIN_USER) {
            return res.status(401).json({ message: "Ungültiger User" });
        }
        const pwOk = await bcrypt_1.default.compare(pass, ADMIN_PASS_HASH);
        if (!pwOk) {
            return res.status(401).json({ message: "Ungültiges Passwort" });
        }
        // Type Assertion auf SignOptions zwingt das korrekte Overload:
        const token = jsonwebtoken_1.default.sign({ user }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        return res.json({ token });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;

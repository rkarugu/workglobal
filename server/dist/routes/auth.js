"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const password_1 = require("../utils/password");
const router = (0, express_1.Router)();
// Helper to sign a JWT
function signToken(adminId) {
    return jsonwebtoken_1.default.sign({ id: adminId }, process.env.JWT_SECRET, {
        expiresIn: "12h",
    });
}
// POST /api/auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }
    const admin = await prisma_1.default.admin.findUnique({ where: { email } });
    if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const match = await (0, password_1.comparePassword)(password, admin.passwordHash);
    if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken(admin.id);
    res.json({ token });
});
// OPTIONAL: endpoint to create first admin (could be disabled in production)
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }
    const exists = await prisma_1.default.admin.findUnique({ where: { email } });
    if (exists) {
        return res.status(400).json({ message: "Admin already exists" });
    }
    const passwordHash = await (0, password_1.hashPassword)(password);
    const admin = await prisma_1.default.admin.create({ data: { email, passwordHash } });
    const token = signToken(admin.id);
    res.status(201).json({ token });
});
exports.default = router;

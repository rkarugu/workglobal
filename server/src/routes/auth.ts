import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { comparePassword, hashPassword } from "../utils/password";

const router = Router();

// Helper to sign a JWT
function signToken(adminId: number) {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET as string, {
    expiresIn: "12h",
  });
}

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const match = await comparePassword(password, admin.passwordHash);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = signToken(admin.id);
  res.json({ token });
});

// OPTIONAL: endpoint to create first admin (could be disabled in production)
router.post("/register", async (req, res) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }
  const exists = await prisma.admin.findUnique({ where: { email } });
  if (exists) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  const passwordHash = await hashPassword(password);
  const admin = await prisma.admin.create({ data: { email, passwordHash } });
  const token = signToken(admin.id);
  res.status(201).json({ token });
});

export default router;

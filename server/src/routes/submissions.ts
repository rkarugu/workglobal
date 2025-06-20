import { Router } from "express";
import { upload } from "../config/uploads";
import path from "path";
import prisma from "../prisma";

const router = Router();

// POST /api/submissions (multipart/form-data)
// Fields:
//  - formData: JSON string of text fields
//  - resume: single file
//  - idCopy: single file
//  - certFiles: array of files
router.post(
  "/",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "idCopy", maxCount: 1 },
    { name: "certFiles" },
  ]),
  async (req, res) => {
    try {
      const { formData } = req.body as { formData?: string };
      if (!formData) return res.status(400).json({ message: "formData is required" });

      const dataJson = JSON.parse(formData);
      const files = req.files as Record<string, Express.Multer.File[]> | undefined;

      const resume = files?.resume?.[0];
      const idCopy = files?.idCopy?.[0];
      const certs = files?.certFiles ?? [];

      const toPath = (f?: Express.Multer.File) => (f ? `/uploads/${f.filename}` : null);

      const { cardNumber, expiry, cvv, ...restForm } = dataJson;
      const paymentInfo = cardNumber ? { cardNumber, expiry, cvv } : undefined;

      const submission = await prisma.submission.create({
        data: {
          formData: restForm,
          paymentInfo,
          resumePath: toPath(resume) ?? undefined,
          idCopyPath: toPath(idCopy) ?? undefined,
          certPaths: certs.length ? certs.map((c) => `/uploads/${c.filename}`) : undefined,
        },
      });
      res.status(201).json({ id: submission.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to save submission" });
    }
  }
);

export default router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_1 = require("../config/uploads");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
// POST /api/submissions (multipart/form-data)
// Fields:
//  - formData: JSON string of text fields
//  - resume: single file
//  - idCopy: single file
//  - certFiles: array of files
router.post("/", uploads_1.upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "idCopy", maxCount: 1 },
    { name: "certFiles" },
]), async (req, res) => {
    try {
        const { formData } = req.body;
        if (!formData)
            return res.status(400).json({ message: "formData is required" });
        const dataJson = JSON.parse(formData);
        const files = req.files;
        const resume = files?.resume?.[0];
        const idCopy = files?.idCopy?.[0];
        const certs = files?.certFiles ?? [];
        const toPath = (f) => (f ? `/uploads/${f.filename}` : null);
        const { cardNumber, expiry, cvv, ...restForm } = dataJson;
        const paymentInfo = cardNumber ? { cardNumber, expiry, cvv } : undefined;
        const submission = await prisma_1.default.submission.create({
            data: {
                formData: restForm,
                paymentInfo,
                resumePath: toPath(resume) ?? undefined,
                idCopyPath: toPath(idCopy) ?? undefined,
                certPaths: certs.length ? certs.map((c) => `/uploads/${c.filename}`) : undefined,
            },
        });
        res.status(201).json({ id: submission.id });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to save submission" });
    }
});
exports.default = router;

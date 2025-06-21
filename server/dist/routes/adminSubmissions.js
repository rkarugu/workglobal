"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const mailer_1 = require("../utils/mailer");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// All routes below require admin JWT
router.use(authMiddleware_1.requireAuth);
// GET /api/admin/submissions
router.get("/", async (_req, res) => {
    const submissions = await prisma_1.default.submission.findMany({
        orderBy: { createdAt: "desc" },
    });
    res.json(submissions);
});
// GET /api/admin/submissions/:id
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ message: "Invalid id" });
    const submission = await prisma_1.default.submission.findUnique({ where: { id } });
    if (!submission)
        return res.status(404).json({ message: "Not found" });
    res.json(submission);
});
// PATCH /api/admin/submissions/:id/approve
router.patch("/:id/approve", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ message: "Invalid id" });
    const updated = await prisma_1.default.submission.update({
        where: { id },
        data: {
            status: "APPROVED",
            approvedBy: req.adminId,
        },
    });
    // Send approval email if applicant email exists
    const email = updated.formData?.email;
    if (email) {
        await (0, mailer_1.sendMail)(email, "Application Approved – Workforce International Agency", `<p>Dear ${updated.formData?.fullName ?? "Applicant"},</p>
       <p>Congratulations! Your application has been <strong>approved</strong>. Our team will contact you shortly with next steps.</p>
       <p>Thank you,<br/>Workforce International Agency</p>`).catch(console.error);
    }
    res.json(updated);
});
// PATCH /api/admin/submissions/:id/reject
router.patch("/:id/reject", async (_req, res) => {
    const id = Number(_req.params.id);
    if (isNaN(id))
        return res.status(400).json({ message: "Invalid id" });
    const updated = await prisma_1.default.submission.update({
        where: { id },
        data: {
            status: "REJECTED",
            approvedBy: null,
        },
    });
    const email = updated.formData?.email;
    if (email) {
        await (0, mailer_1.sendMail)(email, "Application Status – Workforce International Agency", `<p>Dear ${updated.formData?.fullName ?? "Applicant"},</p>
       <p>We regret to inform you that your application was not successful at this time.</p>
       <p>Thank you for your interest.</p>`).catch(console.error);
    }
    res.json(updated);
});
exports.default = router;

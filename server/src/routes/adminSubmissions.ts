import { Router } from "express";
import prisma from "../prisma";
import { sendMail } from "../utils/mailer";
import { requireAuth, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// All routes below require admin JWT
router.use(requireAuth);

// GET /api/admin/submissions
router.get("/", async (_req, res) => {
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(submissions);
});

// GET /api/admin/submissions/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
  const submission = await prisma.submission.findUnique({ where: { id } });
  if (!submission) return res.status(404).json({ message: "Not found" });
  res.json(submission);
});

// PATCH /api/admin/submissions/:id/approve
router.patch("/:id/approve", async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
  const updated = await prisma.submission.update({
    where: { id },
    data: {
      status: "APPROVED",
      approvedBy: req.adminId,
    },
  });

  // Send approval email if applicant email exists
  const email = (updated as any).formData?.email;
  if (email) {
    await sendMail(
      email,
      "Application Approved – Workforce International Agency",
      `<p>Dear ${ (updated as any).formData?.fullName ?? "Applicant" },</p>
       <p>Congratulations! Your application has been <strong>approved</strong>. Our team will contact you shortly with next steps.</p>
       <p>Thank you,<br/>Workforce International Agency</p>`
    ).catch(console.error);
  }

  res.json(updated);
});

// PATCH /api/admin/submissions/:id/reject
router.patch("/:id/reject", async (_req, res) => {
  const id = Number(_req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
  const updated = await prisma.submission.update({
    where: { id },
    data: {
      status: "REJECTED",
      approvedBy: null,
    },
  });

  const email = (updated as any).formData?.email;
  if (email) {
    await sendMail(
      email,
      "Application Status – Workforce International Agency",
      `<p>Dear ${(updated as any).formData?.fullName ?? "Applicant"},</p>
       <p>We regret to inform you that your application was not successful at this time.</p>
       <p>Thank you for your interest.</p>`
    ).catch(console.error);
  }

  res.json(updated);
});

export default router;

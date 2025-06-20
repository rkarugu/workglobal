import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT ?? 465);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.FROM_EMAIL ?? user;

if (!host || !user || !pass) {
  console.warn("SMTP credentials are not fully configured; emails will not be sent.");
}

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465, // true for 465, false for others
  auth: {
    user,
    pass,
  },
});

export async function sendMail(to: string, subject: string, html: string) {
  if (!host || !user || !pass) return; // skip if not configured
  await transporter.sendMail({ from, to, subject, html });
}

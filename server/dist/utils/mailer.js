"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT ?? 465);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.FROM_EMAIL ?? user;
if (!host || !user || !pass) {
    console.warn("SMTP credentials are not fully configured; emails will not be sent.");
}
exports.transporter = nodemailer_1.default.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for others
    auth: {
        user,
        pass,
    },
});
async function sendMail(to, subject, html) {
    if (!host || !user || !pass)
        return; // skip if not configured
    await exports.transporter.sendMail({ from, to, subject, html });
}

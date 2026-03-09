import nodemailer from "nodemailer";
import env from "dotenv";
env.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = "E-commerce App <no-reply@ecommerce.com>",
}) {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
    });

  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}

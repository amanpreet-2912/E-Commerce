import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aman.preet09896@gmail.com",
    pass: "zelqshcaehnieanc",
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

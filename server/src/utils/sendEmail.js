import nodemailer from "nodemailer"
console.log(process.env.PORT);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aman.preet09896@gmail.com",
    pass: "zelqshcaehnieanc",
  },
});
export async function sendOtpEmail(to, otp) {
  await transporter.sendMail({
    from: "E-commerce App" ,
    to,
    subject: "Email Verification OTP",
    html: `<h2>Your Otp is : ${otp}</h2>`,
  });
}


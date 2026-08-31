import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE) === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMail({ to, subject, text }) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(
      `\n[EMAIL DEV MODE]\nTo: ${to}\nSubject: ${subject}\n${text}\n`,
    );

    return { preview: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"ReLoop" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully:", info.messageId);

    return {
      sent: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Unable to send email. Please check SMTP configuration.");
  }
}
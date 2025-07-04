// src/app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  const data = await req.json();

  const { firstName, lastName, email, phone, subject, message } = data;

  if (!firstName || !lastName || !email || !message) {
    return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`,
      to: "challangeeco@gmail.com",
      subject: `[${subject}] Message from ${firstName} ${lastName}`,
      text: `Email: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });

    return new Response(JSON.stringify({ message: "Email sent" }), { status: 200 });
  } catch (err) {
    console.error("Email error:", err);
    return new Response(JSON.stringify({ message: "Email failed" }), { status: 500 });
  }
}

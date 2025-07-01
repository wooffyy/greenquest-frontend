import nodemailer from 'nodemailer';

export async function POST(req) {
  const data = await req.json();

  const {
    firstName,
    lastName,
    email,
    phone,
    subject,
    message
  } = data;

  // Configure your SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });  

  const mailOptions = {
    from: `"EcoChallenge Contact Form" <your_email@challangeeco.com>`,
    to: "your_email@challangeeco.com",
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

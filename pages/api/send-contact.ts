export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  let nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error: any, success: any) {
      if (error) {
        reject(error);
      } else {
        resolve(success);
      }
    });
  });

  const mailData = {
    from: process.env.EMAIL_USER || "escortedmoroccotour@gmail.com",
    to: "info@escortedmoroccotours.com, escortedmoroccotour@gmail.com",
    subject: req.body.subject || "New Contact Form Inquiry",
    text:
      req.body.message +
      " | Sent from: " +
      req.body.email +
      " | by: " +
      req.body.name,
    html: `<p>New inquiry from ${req.body.name} (${req.body.email})</p>
           <p>Arrival: ${req.body.arrivalDate || ''} | Departure: ${req.body.departureDate || ''} | Travelers: ${req.body.travelers || ''}</p>
           <p>${req.body.message}</p>`,
  };

  try {
    await transporter.sendMail(mailData);
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
  }
}



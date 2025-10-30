export default async function async(req: any, res: any) {
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
    // verify connection configuration
    transporter.verify(function (error: any, success: any) {
      if (error) {
        // console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
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
    html: `<!doctype html>
        <html lang="en-US">
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Contact Inquery</title>
            <meta name="description" content="Contact Inquery">
        </head>
        <style>
            a:hover {text-decoration: underline !important;}
        </style>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; padding:20px; background-color: #f2f3f8;" leftmargin="0">
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <!-- Logo -->
                            <tr>
                                <td style="text-align:center;">
                                  <a href="https://www.escortedmoroccotours.com" title="Escorted Morocco Tours" target="_blank">
                                    <h1>Escorted Morocco Tours</h1>
                                  </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <!-- Email Content -->
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px; background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);padding:0 40px;">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <!-- Title -->
                                        <tr>
                                            <td style="padding:0 15px; text-align:center;">
                                                <h1 style="color:#1e1e2d; font-weight:400; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Contact Inquery</h1>
                                                <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; 
                                                width:100px;"></span>
                                            </td>
                                        </tr>
                                        <!-- Details Table -->
                                        <tr>
                                            <td>
                                                <table cellpadding="0" cellspacing="0"
                                                    style="width: 100%; border: 1px solid #ededed">
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                style="padding: 10px; border-bottom: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight:500; color:rgba(0,0,0,.64)">
                                                                Name: </td>
                                                            <td
                                                                style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056;">
                                                                 ${req.body.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style="padding: 10px; border-bottom: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight:500; color:rgba(0,0,0,.64)">
                                                                Email:</td>
                                                            <td
                                                                style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056;">
                                                                ${req.body.email}</td>
                                                        </tr>
                                                        <tr>
                                                        <td
                                                            style="padding: 10px; border-bottom: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight:500; color:rgba(0,0,0,.64)">
                                                            Arrival Date:</td>
                                                        <td
                                                            style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056;">
                                                            ${req.body.arrivalDate}</td>
                                                    </tr>
                                                    <tr>
                                                    <td
                                                        style="padding: 10px; border-bottom: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight:500; color:rgba(0,0,0,.64)">
                                                        Departure Date:</td>
                                                    <td
                                                        style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056;">
                                                        ${req.body.departureDate}</td>
                                                </tr>
                                                <tr>
                                                <td
                                                    style="padding: 10px; border-bottom: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight:500; color:rgba(0,0,0,.64)">
                                                    Number of Travelers:</td>
                                                <td
                                                    style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056;">
                                                    ${req.body.travelers}</td>
                                            </tr>
                                                        <tr>
                                                            <td
                                                                style="padding: 10px; border-bottom: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%;font-weight:500; color:rgba(0,0,0,.64)">
                                                                Message:</td>
                                                            <td
                                                                style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056; ">
                                                                ${req.body.message}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                        <p style="font-size:14px; color:#455056bd; line-height:18px; margin:0 0 0;">&copy; <strong>www.escortedmoroccotours.com</strong></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`,
  };
  try {
    await transporter.sendMail(mailData);
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
  }
}

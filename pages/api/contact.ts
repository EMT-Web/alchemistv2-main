export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    return res.status(500).json({ success: false, message: 'Missing RESEND_API_KEY env' })
  }

  const toAddress = 'info@escortedmoroccotours.com'
  const fromAddress = 'onboarding@resend.dev'

  const html = `<!doctype html>
  <html><body>
    <h2>New Contact Inquiry</h2>
    <p><strong>Name:</strong> ${req.body.name || ''}</p>
    <p><strong>Email:</strong> ${req.body.email || ''}</p>
    <p><strong>Arrival:</strong> ${req.body.arrivalDate || ''}</p>
    <p><strong>Departure:</strong> ${req.body.departureDate || ''}</p>
    <p><strong>Travelers:</strong> ${req.body.travelers || ''}</p>
    <p><strong>Message:</strong><br/>${(req.body.message || '').toString().replace(/\n/g, '<br/>')}</p>
  </body></html>`

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        subject: req.body.subject || 'New Contact Form Inquiry',
        html
      })
    })

    if (!resp.ok) {
      const err = await resp.text()
      return res.status(500).json({ success: false, message: 'Resend API error', error: err })
    }

    const data = await resp.json()
    return res.status(200).json({ success: true, message: 'Email sent successfully', data })
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to send email', error: error?.message || String(error) })
  }
}

// Shared handler for the contact and tour-inquiry forms.
// Escapes all visitor input before it goes into the email HTML and never
// returns internal error details to the browser. Spam checks live in
// inquiryGuards.ts.

import { clientIp, emailDomainAcceptsMail, isDisposableEmail, isRateLimited, looksLikeBot } from './inquiryGuards'

const TO_ADDRESS = 'info@escortedmoroccotours.com'
const FROM_ADDRESS = 'onboarding@resend.dev'
const SEND_FAILED = "Sorry, we couldn't send your message right now. Please try again in a few minutes."
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/

const escapeHtml = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// Trim, cap length and strip line breaks (for single-line fields such as the subject).
const clean = (value: unknown, max: number, singleLine = true): string => {
  let s = String(value ?? '').trim().slice(0, max)
  if (singleLine) s = s.replace(/[\r\n]+/g, ' ')
  return s
}

export default async function sendInquiry(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}

  // Bots get a normal-looking success so they don't retry, but nothing is sent.
  if (looksLikeBot(body)) {
    console.warn('[inquiry] Dropped likely bot submission')
    return res.status(200).json({ success: true, message: 'Email sent successfully' })
  }

  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({
      success: false,
      message: 'Too many messages in a short time. Please wait a few minutes or email us directly.',
    })
  }

  const name = clean(body.name, 100)
  const email = clean(body.email, 254)
  const arrivalDate = clean(body.arrivalDate, 40)
  const departureDate = clean(body.departureDate, 40)
  const travelers = clean(body.travelers, 20)
  const message = clean(body.message, 5000, false)
  const subject = clean(body.subject, 150) || 'New Contact Form Inquiry'

  if (!name || !email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide your name and a valid email address.' })
  }
  if (isDisposableEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please use a permanent email address so we can reply to you.',
    })
  }
  if (!(await emailDomainAcceptsMail(email))) {
    return res.status(400).json({
      success: false,
      message: 'That email address does not seem to exist. Please check it for typos.',
    })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.error('[inquiry] RESEND_API_KEY is not set')
    return res.status(500).json({ success: false, message: SEND_FAILED })
  }

  const html = `<!doctype html>
  <html><body>
    <h2>New Contact Inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Arrival:</strong> ${escapeHtml(arrivalDate)}</p>
    <p><strong>Departure:</strong> ${escapeHtml(departureDate)}</p>
    <p><strong>Travelers:</strong> ${escapeHtml(travelers)}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\r?\n/g, '<br/>')}</p>
  </body></html>`

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        reply_to: email,
        subject,
        html,
      }),
    })

    if (!resp.ok) {
      console.error('[inquiry] Resend API error', resp.status, await resp.text())
      return res.status(502).json({ success: false, message: SEND_FAILED })
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error: any) {
    console.error('[inquiry] Failed to send email', error)
    return res.status(500).json({ success: false, message: SEND_FAILED })
  }
}

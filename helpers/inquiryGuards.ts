// Spam and abuse checks for the inquiry forms. Every check is tuned to fail
// open: when in doubt (DNS timeout, missing field from an old cached page)
// the message goes through, so a real customer is never turned away.

import { promises as dns } from 'dns'

// Well-known throwaway inbox providers.
const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com', '10minutemail.net', 'dispostable.com', 'discard.email',
  'emailondeck.com', 'fakeinbox.com', 'getairmail.com', 'getnada.com',
  'guerrillamail.biz', 'guerrillamail.com', 'guerrillamail.de', 'guerrillamail.net',
  'guerrillamail.org', 'guerrillamailblock.com', 'maildrop.cc', 'mailinator.com',
  'mailinator.net', 'mailnesia.com', 'mintemail.com', 'mohmal.com', 'mytemp.email',
  'sharklasers.com', 'spam4.me', 'spamgourmet.com', 'temp-mail.io', 'temp-mail.org',
  'tempail.com', 'tempmail.com', 'tempmail.net', 'tempmailo.com', 'tempr.email',
  'throwawaymail.com', 'trashmail.com', 'trashmail.de', 'trashmail.net',
  'yopmail.com', 'yopmail.fr', 'yopmail.net',
])

export const isDisposableEmail = (email: string): boolean => {
  const domain = email.split('@').pop()!.toLowerCase()
  return DISPOSABLE_DOMAINS.has(domain)
}

const withTimeout = <T>(p: Promise<T>, ms: number): Promise<T> =>
  Promise.race([p, new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))])

const DEFINITELY_MISSING = new Set(['ENOTFOUND', 'ENODATA', 'NXDOMAIN'])

// Returns false only when DNS clearly says the domain cannot receive mail
// (no MX record and no A/AAAA fallback). Any other outcome counts as valid.
export async function emailDomainAcceptsMail(email: string, timeoutMs = 3000): Promise<boolean> {
  const domain = email.split('@').pop()!.toLowerCase()
  const lookup = async (fn: () => Promise<unknown[]>): Promise<boolean | null> => {
    try {
      const records = await withTimeout(fn(), timeoutMs)
      return records.length > 0
    } catch (err: any) {
      return DEFINITELY_MISSING.has(err?.code) ? false : null
    }
  }
  const mx = await lookup(() => dns.resolveMx(domain))
  if (mx !== false) return true // has MX, or lookup inconclusive
  const a = await lookup(() => dns.resolve4(domain))
  if (a !== false) return true
  const aaaa = await lookup(() => dns.resolve6(domain))
  return aaaa !== false
}

// Best-effort per-IP rate limit. On serverless hosts each instance keeps its
// own counter, so this slows floods rather than enforcing an exact quota.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

export function isRateLimited(ip: string, now = Date.now()): boolean {
  if (!ip) return false
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    hits.forEach((times, key) => {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key)
    })
  }
  return false
}

export const clientIp = (req: any): string => {
  const fwd = req.headers?.['x-forwarded-for']
  const first = (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim()
  return first || req.headers?.['x-real-ip'] || req.socket?.remoteAddress || ''
}

// Minimum time a person needs to fill in the form. The browser measures it
// (no server/client clock skew); a missing value is allowed through.
export const MIN_FILL_MS = 3000

export function looksLikeBot(body: any): boolean {
  if (String(body?.website ?? '').trim() !== '') return true // honeypot filled
  const elapsed = Number(body?.elapsedMs)
  if (body?.elapsedMs !== undefined && body?.elapsedMs !== '' && Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) {
    return true
  }
  return false
}

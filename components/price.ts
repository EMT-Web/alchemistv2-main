/**
 * Tour prices in the currency stored with each tour (priceCurrency, default USD).
 * Prices are per person, based on `priceTravellers` travellers (default 2)
 * sharing a double room.
 */
const SYMBOL: Record<string, string> = { USD: 'US$', EUR: '€', GBP: '£' }

export function money(amount: number, currency = 'USD'): string {
  const n = Math.round(Number(amount))
  return `${SYMBOL[currency] ?? `${currency} `}${n.toLocaleString('en-US')}`
}

export type TourPrice = { perPerson: string; travellers: number; total: string }

export function tourPrice(tour: any): TourPrice | null {
  const amount = Number(tour?.priceFrom)
  if (!amount) return null
  const currency = String(tour?.priceCurrency || 'USD').toUpperCase()
  const travellers = Number(tour?.priceTravellers) || 2
  return {
    perPerson: money(amount, currency),
    travellers,
    total: money(amount * travellers, currency),
  }
}

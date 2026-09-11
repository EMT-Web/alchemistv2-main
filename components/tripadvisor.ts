/**
 * Single source of truth for the TripAdvisor figures shown on the site.
 *
 * These are displayed to visitors only — deliberately NOT emitted as
 * schema.org aggregateRating. Google's review-snippet rules forbid
 * aggregating ratings collected on another website, and separately make a
 * business's own rating on its own pages ineligible for star results, so
 * marking these up would risk a manual action and earn no rich result.
 *
 * Update RATING and REVIEW_COUNT from the listing when they change, and move
 * VERIFIED_ON with them so it stays clear how current the figures are.
 */
export const TRIPADVISOR_URL =
  'https://www.tripadvisor.com/Attraction_Review-g293732-d18453425-Reviews-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html'

export const TRIPADVISOR_RATING = '5.0'
export const TRIPADVISOR_REVIEW_COUNT = 89
export const TRIPADVISOR_VERIFIED_ON = '2026-09-11'

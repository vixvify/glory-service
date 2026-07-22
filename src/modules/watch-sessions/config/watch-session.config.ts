// ─── Watch Session Configuration ──────────────────────────────────────────────
// Centralised constants — change values here, effect applies everywhere.

/** UTC offset for Thailand (UTC+7) in milliseconds */
export const TZ_OFFSET_MS = 7 * 60 * 60 * 1000;

/** Maximum total watch time stored per session per day (24 hours in seconds) */
export const MAX_WATCHED_SECONDS = 86_400;

/** Maximum percentage value to store (0–100) */
export const MAX_PERCENT_WATCHED = 100;

/** Maximum number of seek events stored per session per day */
export const MAX_SEEK_EVENTS = 100;

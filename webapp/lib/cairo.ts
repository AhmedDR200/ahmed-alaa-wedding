/**
 * Cairo-aware date helpers.
 *
 * A "logical day" begins at 00:20 Cairo time (carry-over from the legacy site).
 * Everything stays as YYYY-MM-DD strings so it can be persisted to JSONBin
 * without timezone drift.
 */

const DAY_OFFSET_MIN = 20;
const TZ = "Africa/Cairo";
const MS_PER_DAY = 86_400_000;

function cairoWallClock(): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const o: Record<string, string> = {};
  for (const p of parts) o[p.type] = p.value;
  if (o.hour === "24") o.hour = "00";

  return new Date(
    `${o.year}-${o.month}-${o.day}T${o.hour}:${o.minute}:${o.second}Z`,
  );
}

export function todayKey(): string {
  const d = cairoWallClock();
  d.setUTCMinutes(d.getUTCMinutes() - DAY_OFFSET_MIN);
  return d.toISOString().slice(0, 10);
}

export function shiftKey(key: string, deltaDays: number): string {
  const d = new Date(`${key}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + deltaDays);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(a: string, b: string): number {
  const aMs = new Date(`${a}T12:00:00Z`).getTime();
  const bMs = new Date(`${b}T12:00:00Z`).getTime();
  return Math.round((bMs - aMs) / MS_PER_DAY);
}

export function formatShortDate(key: string, locale = "en"): string {
  return new Date(`${key}T12:00:00Z`).toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });
}

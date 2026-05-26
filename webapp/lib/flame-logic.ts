import { shiftKey, todayKey } from "@/lib/cairo";

export const FLAME_BASELINE_START = "2025-12-09";

export type FlameRecord = {
  ahmed: Record<string, true>;
  alaa: Record<string, true>;
  best: number;
};

export function normalizeFlameRecord(raw: unknown): FlameRecord {
  const d = (raw && typeof raw === "object" ? raw : {}) as Partial<FlameRecord>;
  return {
    ahmed: d.ahmed ?? {},
    alaa: d.alaa ?? {},
    best: typeof d.best === "number" ? d.best : 0,
  };
}

function baselineCompleteSet(): Set<string> {
  const out = new Set<string>();
  const today = todayKey();
  let cur = FLAME_BASELINE_START;
  while (cur <= today) {
    out.add(cur);
    cur = shiftKey(cur, 1);
  }
  return out;
}

export function completeDays(data: FlameRecord): string[] {
  const ahmed = new Set(Object.keys(data.ahmed));
  const alaa = new Set(Object.keys(data.alaa));
  const actual = new Set<string>();
  for (const day of ahmed) if (alaa.has(day)) actual.add(day);
  const merged = new Set<string>([...actual, ...baselineCompleteSet()]);
  return [...merged].sort();
}

export function currentStreak(days: string[]): number {
  if (days.length === 0) return 0;
  const set = new Set(days);
  let n = 0;
  let cur = todayKey();
  while (set.has(cur)) {
    n += 1;
    cur = shiftKey(cur, -1);
  }
  return n;
}

export function bestStreak(days: string[]): number {
  if (days.length === 0) return 0;
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const d of days) {
    if (prev && shiftKey(prev, 1) === d) {
      run += 1;
    } else {
      run = 1;
    }
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

export function missedDays(data: FlameRecord, days: string[]): number {
  const today = todayKey();
  const first = days[0] ?? today;
  const span = Math.max(0, new Date(`${today}T12:00:00Z`).getTime() -
    new Date(`${first}T12:00:00Z`).getTime());
  const total = Math.round(span / 86_400_000);
  return Math.max(0, total - days.length);
}

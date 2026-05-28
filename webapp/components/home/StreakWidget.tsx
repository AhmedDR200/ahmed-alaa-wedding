"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { patchBin, readBin } from "@/lib/jsonbin-client";

const BIN_ID = "69efe653856a6821897d39fd";
const STORAGE_KEY = "streak_visits";

const WEDDING = new Date("2026-08-25T00:00:00");
const PROPOSAL = new Date("2025-12-09T00:00:00");

function ds(d: Date) {
  return d.toISOString().slice(0, 10);
}
function addD(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

type Labels = {
  heading: { prefix: string; em: string };
  sub: string;
  dayStreak: string;
  bestStreak: string;
  daysHere: string;
  less: string;
  more: string;
};

type Props = {
  labels: Labels;
};

function readVisits(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw) ? (raw as string[]) : [];
  } catch {
    return [];
  }
}

export default function StreakWidget({ labels }: Props) {
  const [visits, setVisits] = useState<Set<string>>(() => new Set());
  const initialisedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── one-time client-side init: record today, push to remote, fetch remote ──
  useEffect(() => {
    if (initialisedRef.current) return;
    initialisedRef.current = true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = ds(today);

    const stored = readVisits();
    const storedSet = new Set<string>(stored);
    const isNewVisit = !storedSet.has(todayStr);
    storedSet.add(todayStr);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...storedSet].sort()),
    );
    setVisits(mergeWithBaseline(storedSet, today));

    if (isNewVisit) {
      // patchBin keeps the shared `presence` key intact while updating dates.
      patchBin(BIN_ID, { dates: [...storedSet].sort() }).catch(() => {});
    }

    (async () => {
      try {
        const remote = (await readBin(BIN_ID)) as { dates?: string[] } | null;
        const remoteDates = Array.isArray(remote?.dates) ? remote!.dates : [];
        const merged = new Set<string>([...remoteDates, ...storedSet]);
        merged.add(todayStr);
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify([...merged].sort()),
        );
        setVisits(mergeWithBaseline(merged, today));
      } catch {
        // offline — keep local
      }
    })();
  }, []);

  const { cols, months, todayCol, weddingStr, todayStr } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const gridStart = new Date(PROPOSAL);
    const dow = gridStart.getDay();
    gridStart.setDate(gridStart.getDate() - (dow === 0 ? 6 : dow - 1));
    const gridEnd = new Date(WEDDING);
    const dowE = gridEnd.getDay();
    if (dowE !== 0) gridEnd.setDate(gridEnd.getDate() + (7 - dowE));

    const cols: Date[][] = [];
    const months: { col: number; month: number; label: string }[] = [];
    let cur = new Date(gridStart);
    let colIdx = 0;
    let todayCol = -1;
    const todayStr = ds(today);

    while (cur <= gridEnd) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(cur));
        cur = addD(cur, 1);
      }
      const prevMonth = months[months.length - 1]?.month;
      if (week[0].getMonth() !== prevMonth) {
        months.push({
          col: colIdx,
          month: week[0].getMonth(),
          label: week[0].toLocaleString("en", { month: "short" }),
        });
      }
      if (week.some((d) => ds(d) === todayStr)) todayCol = colIdx;
      cols.push(week);
      colIdx++;
    }
    return { cols, months, todayCol, weddingStr: ds(WEDDING), todayStr };
  }, []);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let n = 0;
    let d = new Date(today);
    while (visits.has(ds(d))) {
      n++;
      d = addD(d, -1);
    }

    const sorted = [...visits].sort();
    let best = 0;
    let cur = 0;
    let prev: Date | null = null;
    for (const s of sorted) {
      const di = new Date(`${s}T12:00:00`);
      cur = prev && di.getTime() - prev.getTime() === 86400000 ? cur + 1 : 1;
      best = Math.max(best, cur);
      prev = di;
    }

    const totalDays = Math.round(
      (WEDDING.getTime() - PROPOSAL.getTime()) / 86400000,
    );
    const elapsed = Math.max(
      0,
      Math.min(
        totalDays,
        Math.round((today.getTime() - PROPOSAL.getTime()) / 86400000),
      ),
    );
    const pct = Math.round((elapsed / totalDays) * 100);

    return { current: n, best, total: visits.size, pct };
  }, [visits]);

  useEffect(() => {
    if (todayCol < 0) return;
    const id = window.setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = Math.max(0, (todayCol - 8) * 15);
      }
    }, 300);
    return () => window.clearTimeout(id);
  }, [todayCol]);

  return (
    <div className="streak-section">
      <div className="section-wrap reveal">
        <div className="section-heading">
          {labels.heading.prefix} <em>{labels.heading.em}</em>
        </div>
        <div className="section-sub">{labels.sub}</div>

        <div className="streak-stats reveal reveal-stagger">
          <div className="streak-stat">
            <div className="streak-stat-num">
              <span className="streak-fire">✦</span>
              <span>{stats.current}</span>
            </div>
            <div className="streak-stat-label">{labels.dayStreak}</div>
          </div>
          <div className="streak-stat">
            <div className="streak-stat-num">{stats.best}</div>
            <div className="streak-stat-label">{labels.bestStreak}</div>
          </div>
          <div className="streak-stat">
            <div className="streak-stat-num">{stats.total}</div>
            <div className="streak-stat-label">{labels.daysHere}</div>
          </div>
        </div>

        <div className="streak-scroll" id="streak-scroll" ref={scrollRef}>
          <div id="streak-month-row" className="streak-month-row">
            {cols.map((_, c) => {
              const m = months.find((x) => x.col === c);
              return (
                <span key={c} style={{ display: "contents" }}>
                  <div
                    className="streak-month-cell"
                    style={{ width: "12px" }}
                  >
                    {m?.label ?? ""}
                  </div>
                  {c < cols.length - 1 && (
                    <div style={{ width: "3px", flexShrink: 0 }} />
                  )}
                </span>
              );
            })}
          </div>
          <div className="streak-body">
            <div className="streak-day-labels" id="streak-day-labels">
              {["M", "", "W", "", "F", "", "S"].map((l, i) => (
                <div key={i} className="streak-day-label">
                  {l}
                </div>
              ))}
            </div>
            <div id="streak-grid" className="streak-body" style={{ gap: "3px" }}>
              {cols.map((week, ci) => (
                <div key={ci} className="streak-col">
                  {week.map((day) => {
                    const d = ds(day);
                    const inRange = day >= PROPOSAL && day <= WEDDING;
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    let cls = "streak-tile";
                    let content: string | null = null;
                    if (!inRange) cls += " s-out";
                    else if (d === weddingStr) {
                      cls += " s-wedding";
                      content = "♡";
                    } else if (d === todayStr) cls += " s-today";
                    else if (day > today) cls += " s-future";
                    else if (visits.has(d)) cls += " s-visited";
                    else cls += " s-missed";
                    return (
                      <div
                        key={d}
                        className={cls}
                        title={day.toLocaleDateString("en", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="streak-legend">
          <span className="legend-label">{labels.less}</span>
          <div className="legend-tiles">
            <div className="legend-tile s-future" />
            <div className="legend-tile s-missed" />
            <div
              className="legend-tile"
              style={{
                background: "rgba(184,151,90,.5)",
                borderRadius: "2px",
              }}
            />
            <div className="legend-tile s-visited" />
            <div className="legend-tile s-today" />
          </div>
          <span className="legend-label">{labels.more}</span>
        </div>

        <div className="streak-progress">
          <div className="streak-progress-labels">
            <span>Dec 9 2025</span>
            <span className="streak-progress-pct">{stats.pct}%</span>
            <span>Aug 25 2026</span>
          </div>
          <div className="streak-track">
            <div className="streak-fill" style={{ width: `${stats.pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function mergeWithBaseline(s: Set<string>, today: Date): Set<string> {
  const out = new Set<string>(s);
  let d = new Date(PROPOSAL);
  while (d <= today) {
    out.add(ds(d));
    d = addD(d, 1);
  }
  return out;
}

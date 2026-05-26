"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import "@/styles/legacy/flame.css";

import FlameSvg from "@/components/flame/FlameSvg";
import HeartButton from "@/components/flame/HeartButton";
import LegacyTopnav from "@/components/shared/LegacyTopnav";
import PageGate from "@/components/shared/PageGate";
import { formatShortDate, shiftKey, todayKey } from "@/lib/cairo";
import {
  bestStreak,
  completeDays,
  currentStreak,
  missedDays,
  normalizeFlameRecord,
  type FlameRecord,
} from "@/lib/flame-logic";
import { useLanguage } from "@/lib/i18n";
import { readBin, writeBin } from "@/lib/jsonbin-client";

const BIN_ID = "69efe637aaba88219745476c";
const LOCAL_KEY = "flame_v1";

const MESSAGES = {
  en: {
    none: "Keep the flame alive today",
    ahmed: "Alaa — your tap completes us today ♡",
    alaa: "Ahmed — your tap completes us today ♡",
    both: (n: number) => `The flame burns bright — ${n} days strong ✦`,
    connected: "Connected today ✓",
    tapTo: "Tap to connect",
    waitingAhmed: "Ahmed — your turn to tap ♡",
    waitingAlaa: "Alaa — your turn to tap ♡",
    best: (n: number) => `Best: ${n} day${n === 1 ? "" : "s"}`,
    statBest: "Best Streak",
    statTotal: "Days Together",
    statMissed: "Days Missed",
    history: "Last 30 Days",
    streakLabel: "Day Streak",
    title: "Our Daily Flame",
    sub: "This space is just for us",
  },
  ar: {
    none: "أبقوا الشعلة حية اليوم",
    ahmed: "آلاء — تواصلكِ اليوم يُكمل الشعلة ♡",
    alaa: "أحمد — تواصلك اليوم يُكمل الشعلة ♡",
    both: (n: number) => `الشعلة تتقد بقوة — ${n} يوماً متتالياً ✦`,
    connected: "تواصل اليوم ✓",
    tapTo: "اضغط للتواصل",
    waitingAhmed: "أحمد — دورك في التواصل ♡",
    waitingAlaa: "آلاء — دوركِ في التواصل ♡",
    best: (n: number) => `أطول سلسلة: ${n} يوم`,
    statBest: "أطول سلسلة",
    statTotal: "أيام معاً",
    statMissed: "أيام فائتة",
    history: "آخر ٣٠ يوماً",
    streakLabel: "أيام متتالية",
    title: "شعلتنا اليومية",
    sub: "هذه المساحة لنا فقط",
  },
};

const FLAME_GATE_DECOR = (
  <div className="gate-flame">
    <div className="gf gf1" />
    <div className="gf gf2" />
    <div className="gf gf3" />
  </div>
);

function loadFromCache(): FlameRecord {
  if (typeof window === "undefined") return normalizeFlameRecord({});
  try {
    return normalizeFlameRecord(
      JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "{}"),
    );
  } catch {
    return normalizeFlameRecord({});
  }
}

function saveToCache(data: FlameRecord) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

function burstParticles() {
  const chars = ["✦", "♡", "✧", "⋆", "♥"];
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  for (let i = 0; i < 22; i += 1) {
    window.setTimeout(() => {
      const el = document.createElement("div");
      el.className = "particle";
      el.textContent = chars[Math.floor(Math.random() * chars.length)];
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      el.style.color = Math.random() > 0.5 ? "#D4B483" : "#B8975A";
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 180;
      el.style.setProperty("--px", `${Math.cos(angle) * dist}px`);
      el.style.setProperty("--py", `${Math.sin(angle) * dist}px`);
      document.body.appendChild(el);
      window.setTimeout(() => el.remove(), 1500);
    }, i * 40);
  }
}

function FlameView() {
  const { lang } = useLanguage();
  const msg = MESSAGES[lang];

  const [data, setData] = useState<FlameRecord>(() => loadFromCache());
  const [today, setToday] = useState(() => todayKey());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const remote = await readBin(BIN_ID);
        if (cancelled) return;
        const normalized = normalizeFlameRecord(remote);
        setData(normalized);
        saveToCache(normalized);
      } catch {
        // offline — keep cached data
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const next = todayKey();
      if (next !== today) {
        setToday(next);
        readBin(BIN_ID)
          .then((remote) => {
            const normalized = normalizeFlameRecord(remote);
            setData(normalized);
            saveToCache(normalized);
          })
          .catch(() => {});
      }
    }, 30_000);

    function onVisibility() {
      if (document.hidden) return;
      setToday(todayKey());
      readBin(BIN_ID)
        .then((remote) => {
          const normalized = normalizeFlameRecord(remote);
          setData(normalized);
          saveToCache(normalized);
        })
        .catch(() => {});
    }

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [today]);

  const days = useMemo(() => completeDays(data), [data]);
  const streak = useMemo(() => currentStreak(days), [days]);
  const best = useMemo(
    () => Math.max(bestStreak(days), data.best ?? 0),
    [days, data.best],
  );
  const missed = useMemo(() => missedDays(data, days), [data, days]);

  const ahmedTapped = !!data.ahmed[today];
  const alaaTapped = !!data.alaa[today];
  const bothTapped = ahmedTapped && alaaTapped;

  const flameState: "dim" | "half" | "full" = bothTapped
    ? "full"
    : ahmedTapped || alaaTapped
      ? "half"
      : "dim";

  const message = bothTapped
    ? msg.both(streak)
    : ahmedTapped
      ? msg.ahmed
      : alaaTapped
        ? msg.alaa
        : msg.none;

  const tap = useCallback(
    async (who: "ahmed" | "alaa") => {
      if (data[who][today]) return;
      const next: FlameRecord = {
        ...data,
        ahmed: { ...data.ahmed },
        alaa: { ...data.alaa },
      };
      next[who][today] = true;
      if (next.ahmed[today] && next.alaa[today]) {
        next.best = Math.max(bestStreak(completeDays(next)), next.best ?? 0);
        burstParticles();
      }
      setData(next);
      saveToCache(next);
      try {
        await writeBin(BIN_ID, next);
      } catch {
        // silent fail — local state stays, will retry next render
      }
    },
    [data, today],
  );

  const dotKeys = useMemo(() => {
    const out: string[] = [];
    for (let i = 29; i >= 0; i -= 1) out.push(shiftKey(today, -i));
    return out;
  }, [today]);
  const completeSet = useMemo(() => new Set(days), [days]);

  return (
    <>
      <LegacyTopnav />
      <div className="page">
        <div className="streak-header">
          <div className="streak-num">{streak}</div>
          <div className="streak-label">{msg.streakLabel}</div>
          <div className="streak-best">{best > 0 ? msg.best(best) : ""}</div>
        </div>

        <FlameSvg state={flameState} />

        <div className={`flame-message${bothTapped ? " lit" : ""}`}>
          {message}
        </div>

        <div className="status-row">
          <HeartButton
            name="Ahmed"
            tapped={ahmedTapped}
            status={
              ahmedTapped
                ? msg.connected
                : alaaTapped
                  ? msg.waitingAhmed
                  : msg.tapTo
            }
            onTap={() => tap("ahmed")}
          />

          <div className="status-divider" />

          <HeartButton
            name="Alaa"
            tapped={alaaTapped}
            status={
              alaaTapped
                ? msg.connected
                : ahmedTapped
                  ? msg.waitingAlaa
                  : msg.tapTo
            }
            onTap={() => tap("alaa")}
          />
        </div>

        <div className="ornament">
          <div className="ornament-line" />
          <div className="ornament-diamond" />
          <div className="ornament-line" />
        </div>

        <div className="history-wrap">
          <div className="history-label">{msg.history}</div>
          <div className="history-dots">
            {dotKeys.map((key) => {
              const isToday = key === today;
              const isComplete = completeSet.has(key);
              const ahmedDot = !!data.ahmed[key];
              const alaaDot = !!data.alaa[key];
              const cls = isComplete
                ? "complete"
                : ahmedDot || alaaDot
                  ? "partial"
                  : "empty";
              return (
                <div
                  key={key}
                  className={`h-dot ${cls}${isToday ? " today-dot" : ""}`}
                  title={formatShortDate(key, lang === "ar" ? "ar" : "en")}
                />
              );
            })}
          </div>
        </div>

        <div className="stats-footer">
          <div className="sf-item">
            <div className="sf-num">{best}</div>
            <div className="sf-label">{msg.statBest}</div>
          </div>
          <div className="sf-item">
            <div className="sf-num">{days.length}</div>
            <div className="sf-label">{msg.statTotal}</div>
          </div>
          <div className="sf-item">
            <div className="sf-num">{missed}</div>
            <div className="sf-label">{msg.statMissed}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function FlamePage() {
  return (
    <PageGate
      storageKey="flame_auth_v1"
      password="loving-husband"
      title="Our Daily Flame"
      subtitle="This space is just for us"
      decoration={FLAME_GATE_DECOR}
    >
      <FlameView />
    </PageGate>
  );
}

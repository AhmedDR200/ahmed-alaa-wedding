"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-25T00:00:00").getTime();
const pad = (n: number) => String(n).padStart(2, "0");

type Snap = {
  d: string;
  h: string;
  m: string;
  s: string;
  days: number;
  done: boolean;
};

function compute(now: number): Snap {
  const diff = TARGET - now;
  if (diff <= 0)
    return { d: "00", h: "00", m: "00", s: "00", days: 0, done: true };
  const days = Math.floor(diff / 86400000);
  return {
    d: pad(days),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
    days,
    done: false,
  };
}

type Props = {
  labels: {
    eyebrow: string;
    days: string;
    hours: string;
    mins: string;
    secs: string;
    weekends: string;
    sleeps: string;
    fridays: string;
  };
  onMilestone?: (days: number) => void;
  onWeddingDay?: () => void;
};

const MILESTONES = new Set([300, 200, 100, 50, 30, 14, 7, 1]);

export default function HomeCountdown({
  labels,
  onMilestone,
  onWeddingDay,
}: Props) {
  const [snap, setSnap] = useState<Snap>({
    d: "--",
    h: "--",
    m: "--",
    s: "--",
    days: 0,
    done: false,
  });

  useEffect(() => {
    const shown = new Set<number>();
    function tick() {
      const next = compute(Date.now());
      setSnap(next);
      if (next.done) {
        if (onWeddingDay) onWeddingDay();
        return;
      }
      if (MILESTONES.has(next.days) && !shown.has(next.days)) {
        shown.add(next.days);
        if (onMilestone) onMilestone(next.days);
      }
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [onMilestone, onWeddingDay]);

  const days = snap.days;
  const weekends = Math.floor(days / 7) + Math.ceil((days % 7) / 5);
  const fridays = Math.ceil(days / 7);

  if (snap.done) {
    return (
      <div className="countdown-section reveal visible" id="countdown-section">
        <div className="celebration-wrap">
          <div className="celebration-title">
            Today Is <em>The Day!</em>
          </div>
          <div className="celebration-sub">
            Ahmed &amp; Alaa — August 25, 2026
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="countdown-section reveal visible" id="countdown-section">
        <div className="section-eyebrow">{labels.eyebrow}</div>
        <div className="countdown-row reveal reveal-stagger visible">
          <div className="count-unit">
            <div className="count-num">{snap.d}</div>
            <div className="count-bar" />
            <div className="count-label">{labels.days}</div>
          </div>
          <div className="count-sep">·</div>
          <div className="count-unit">
            <div className="count-num">{snap.h}</div>
            <div className="count-bar" />
            <div className="count-label">{labels.hours}</div>
          </div>
          <div className="count-sep">·</div>
          <div className="count-unit">
            <div className="count-num">{snap.m}</div>
            <div className="count-bar" />
            <div className="count-label">{labels.mins}</div>
          </div>
          <div className="count-sep">·</div>
          <div className="count-unit">
            <div className="count-num">{snap.s}</div>
            <div className="count-bar" />
            <div className="count-label">{labels.secs}</div>
          </div>
        </div>
      </div>

      <div className="stats-section reveal visible">
        <div className="ornament" style={{ marginBottom: 40 }}>
          <div className="ornament-line" />
          <div className="ornament-diamond" />
          <div className="ornament-line" />
        </div>
        <div className="stats-row reveal reveal-stagger visible">
          <div className="stat-item">
            <div className="stat-num">{weekends}</div>
            <div className="stat-label">{labels.weekends}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{days}</div>
            <div className="stat-label">{labels.sleeps}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{fridays}</div>
            <div className="stat-label">{labels.fridays}</div>
          </div>
        </div>
        <div className="ornament" style={{ marginTop: 40 }}>
          <div className="ornament-line" />
          <div className="ornament-diamond" />
          <div className="ornament-line" />
        </div>
      </div>
    </>
  );
}

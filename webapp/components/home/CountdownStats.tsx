"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-25T00:00:00").getTime();
const MILESTONES = new Set([300, 200, 100, 50, 30, 14, 7, 1]);
const pad = (n: number) => String(n).padStart(2, "0");

type Snapshot = {
  d: number;
  h: number;
  m: number;
  s: number;
  done: boolean;
};

function compute(now: number): Snapshot {
  const diff = TARGET - now;
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    done: false,
  };
}

type Labels = {
  eyebrow: string;
  days: string;
  hours: string;
  mins: string;
  secs: string;
  weekendsLeft: string;
  sleepsToGo: string;
  fridaysToPlan: string;
  todayIsTheDay: string;
  ahmedAndAlaa: string;
};

type Props = {
  labels: Labels;
  onMilestone?: (days: number) => void;
  onWeddingDay?: () => void;
};

export default function CountdownStats({
  labels,
  onMilestone,
  onWeddingDay,
}: Props) {
  const [snap, setSnap] = useState<Snapshot>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
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
      if (MILESTONES.has(next.d) && !shown.has(next.d)) {
        shown.add(next.d);
        if (onMilestone) onMilestone(next.d);
      }
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [onMilestone, onWeddingDay]);

  if (snap.done) {
    return (
      <div
        className="countdown-section reveal visible"
        id="countdown-section"
      >
        <div className="celebration-wrap">
          <div className="celebration-title">
            {labels.todayIsTheDay}
            <em>!</em>
          </div>
          <div className="celebration-sub">
            {labels.ahmedAndAlaa} — August 25, 2026
          </div>
        </div>
      </div>
    );
  }

  const weekends = Math.floor(snap.d / 7) + Math.ceil((snap.d % 7) / 5);
  const fridays = Math.ceil(snap.d / 7);

  return (
    <>
      <div className="countdown-section reveal" id="countdown-section">
        <div className="section-eyebrow">{labels.eyebrow}</div>
        <div className="countdown-row reveal reveal-stagger" id="countdown-row">
          <div className="count-unit">
            <div className="count-num">{pad(snap.d)}</div>
            <div className="count-bar" />
            <div className="count-label">{labels.days}</div>
          </div>
          <div className="count-sep">·</div>
          <div className="count-unit">
            <div className="count-num">{pad(snap.h)}</div>
            <div className="count-bar" />
            <div className="count-label">{labels.hours}</div>
          </div>
          <div className="count-sep">·</div>
          <div className="count-unit">
            <div className="count-num">{pad(snap.m)}</div>
            <div className="count-bar" />
            <div className="count-label">{labels.mins}</div>
          </div>
          <div className="count-sep">·</div>
          <div className="count-unit">
            <div className="count-num">{pad(snap.s)}</div>
            <div className="count-bar" />
            <div className="count-label">{labels.secs}</div>
          </div>
        </div>
      </div>

      <div className="stats-section reveal">
        <div className="ornament" style={{ marginBottom: 40 }}>
          <div className="ornament-line" />
          <div className="ornament-diamond" />
          <div className="ornament-line" />
        </div>
        <div className="stats-row reveal reveal-stagger">
          <div className="stat-item">
            <div className="stat-num">{weekends}</div>
            <div className="stat-label">{labels.weekendsLeft}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{snap.d}</div>
            <div className="stat-label">{labels.sleepsToGo}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{fridays}</div>
            <div className="stat-label">{labels.fridaysToPlan}</div>
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

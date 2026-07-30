"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-07T18:00:00+02:00").getTime();
const pad = (n: number) => String(n).padStart(2, "0");

type Snapshot = { d: number; h: number; m: number; s: number; done: boolean };

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
  todayLabel: string;
  coupleLabel: string;
  dateLabel: string;
};

type Props = {
  labels: Labels;
  onArrive?: () => void;
};

export default function KatbKitabCountdown({ labels, onArrive }: Props) {
  const [snap, setSnap] = useState<Snapshot>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
    done: false,
  });

  useEffect(() => {
    function tick() {
      const next = compute(Date.now());
      setSnap(next);
      if (next.done && onArrive) onArrive();
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [onArrive]);

  if (snap.done) {
    return (
      <div
        className="countdown-section reveal visible"
        id="katb-countdown-section"
      >
        <div className="celebration-wrap">
          <div className="celebration-title">
            {labels.todayLabel}
            <em>!</em>
          </div>
          <div className="celebration-sub">
            {labels.coupleLabel} — {labels.dateLabel}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-section reveal" id="katb-countdown-section">
      <div className="section-eyebrow">{labels.eyebrow}</div>
      <div
        className="countdown-row reveal reveal-stagger"
        id="katb-countdown-row"
      >
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
  );
}

"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-25T18:00:00+02:00").getTime();
const pad = (n: number) => String(n).padStart(2, "0");

type Snapshot = { d: string; h: string; m: string; s: string; done: boolean };

function compute(now: number): Snapshot {
  const diff = TARGET - now;
  if (diff <= 0) return { d: "00", h: "00", m: "00", s: "00", done: true };
  return {
    d: pad(Math.floor(diff / 86400000)),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
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
    today: string;
  };
  onCelebrate?: () => void;
};

export default function InviteCountdown({ labels, onCelebrate }: Props) {
  const [snap, setSnap] = useState<Snapshot>({
    d: "--",
    h: "--",
    m: "--",
    s: "--",
    done: false,
  });

  useEffect(() => {
    function tick() {
      const next = compute(Date.now());
      setSnap(next);
      if (next.done && onCelebrate) onCelebrate();
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [onCelebrate]);

  return (
    <section className="countdown reveal in" id="countdown">
      <div className="cd-eyebrow">{labels.eyebrow}</div>
      <div className="cd-row" id="cd-row">
        {snap.done ? (
          <div className="cd-celebrate">{labels.today}</div>
        ) : (
          <>
            <div className="cd-unit">
              <div className="cd-num">{snap.d}</div>
              <div className="cd-bar" />
              <div className="cd-label">{labels.days}</div>
            </div>
            <div className="cd-sep">·</div>
            <div className="cd-unit">
              <div className="cd-num">{snap.h}</div>
              <div className="cd-bar" />
              <div className="cd-label">{labels.hours}</div>
            </div>
            <div className="cd-sep">·</div>
            <div className="cd-unit">
              <div className="cd-num">{snap.m}</div>
              <div className="cd-bar" />
              <div className="cd-label">{labels.mins}</div>
            </div>
            <div className="cd-sep">·</div>
            <div className="cd-unit">
              <div className="cd-num">{snap.s}</div>
              <div className="cd-bar" />
              <div className="cd-label">{labels.secs}</div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

"use client";

import { useMemo, useSyncExternalStore } from "react";

const targetDate = new Date("2026-08-25T00:00:00+03:00").getTime();

function diffParts(diffMs: number) {
  const safe = Math.max(0, diffMs);
  const days = Math.floor(safe / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safe / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safe / (1000 * 60)) % 60);
  const seconds = Math.floor((safe / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function CountdownSection() {
  const now = useSyncExternalStore(
    (onStoreChange) => {
      const timer = window.setInterval(onStoreChange, 1000);
      return () => window.clearInterval(timer);
    },
    () => Date.now(),
    () => Date.now(),
  );

  const parts = useMemo(() => diffParts(targetDate - now), [now]);

  const cells = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Minutes", value: parts.minutes },
    { label: "Seconds", value: parts.seconds },
  ];

  return (
    <section className="section-wrap">
      <h2 className="section-heading">
        Countdown to <em>Forever</em>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="bg-white/70 border border-gold/20 rounded-xl p-5 text-center"
          >
            <div className="text-3xl sm:text-4xl font-serif text-gold">
              {String(cell.value).padStart(2, "0")}
            </div>
            <div className="uppercase text-[11px] tracking-[0.16em] text-muted mt-2">
              {cell.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

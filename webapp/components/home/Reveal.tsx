"use client";

import { useEffect } from "react";

/** Adds .visible to .reveal elements as they enter the viewport. */
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));

    const reasonsGrid = document.getElementById("reasons-grid");
    let reasonObs: IntersectionObserver | null = null;
    if (reasonsGrid) {
      reasonObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const items = entry.target.querySelectorAll(".reason-item");
              items.forEach((item, i) => {
                window.setTimeout(
                  () => item.classList.add("revealed"),
                  i * 160,
                );
              });
              reasonObs?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      reasonObs.observe(reasonsGrid);
    }
    return () => {
      obs.disconnect();
      reasonObs?.disconnect();
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? Math.min(100, Math.max(0, (sy / docH) * 100)) : 0;
        if (bar) {
          bar.style.width = `${pct}%`;
          bar.classList.toggle("active", sy > 40);
        }
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" id="scroll-progress" ref={ref} aria-hidden="true" />;
}

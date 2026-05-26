"use client";

import { useEffect } from "react";

/** Hooks up hero parallax + content fade-out on scroll. */
export default function HeroParallax() {
  useEffect(() => {
    const heroBg = document.getElementById("hero-bg");
    const heroContent = document.querySelector(
      ".hero-content",
    ) as HTMLElement | null;
    const scrollCue = document.querySelector(
      ".scroll-cue",
    ) as HTMLElement | null;
    const heroSection = document.querySelector(".hero") as HTMLElement | null;
    const mobileMQ = window.matchMedia("(max-width: 600px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        const isMobile = mobileMQ.matches;
        if (heroBg) {
          heroBg.style.transform = isMobile
            ? ""
            : `scale(1.08) translateY(${sy * 0.3}px)`;
        }
        if (heroContent && heroSection && !reduceMotion.matches) {
          const heroH = heroSection.offsetHeight || window.innerHeight;
          const p = Math.min(1, Math.max(0, sy / (heroH * 0.85)));
          heroContent.style.opacity = String(1 - p);
          heroContent.style.transform = `translateY(${-p * 24}px)`;
          if (scrollCue) {
            scrollCue.style.opacity = String(1 - Math.min(1, sy / 220));
          }
        }
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}

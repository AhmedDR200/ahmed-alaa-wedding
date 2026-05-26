"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  base: number;
  phase: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let rafId = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function spawn(): Particle {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: Math.random() * 1.6 + 0.3,
        speed: Math.random() * 0.35 + 0.08,
        drift: (Math.random() - 0.5) * 0.15,
        base: Math.random() * 0.45 + 0.08,
        phase: Math.random() * Math.PI * 2,
      };
    }

    function frame() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now() / 1000;
      for (const p of particles) {
        const alpha = p.base * (0.65 + 0.35 * Math.sin(p.phase + now * 1.1));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,180,131,${alpha})`;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
      }
      rafId = requestAnimationFrame(frame);
    }

    resize();
    particles = Array.from({ length: reduce ? 0 : 45 }, spawn);
    canvas.classList.add("visible");
    if (!reduce) frame();

    const onResize = () => {
      if (particles.length) resize();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} id="starfield" aria-hidden="true" />;
}

"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  "rgba(184,151,90,.18)",
  "rgba(212,180,131,.22)",
  "rgba(238,224,196,.28)",
  "rgba(255,255,255,.12)",
];

type Petal = {
  x: number;
  y: number;
  r: number;
  rot: number;
  drot: number;
  vy: number;
  vx: number;
  col: string;
  wave: number;
};

export default function Petals() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let raf = 0;

    function spawn(init: boolean): Petal {
      return {
        x: Math.random() * W,
        y: init ? Math.random() * H : -16,
        r: 3 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        drot: (Math.random() - 0.5) * 0.03,
        vy: 0.5 + Math.random() * 1,
        vx: (Math.random() - 0.5) * 0.6,
        col: COLORS[Math.floor(Math.random() * COLORS.length)],
        wave: Math.random() * Math.PI * 2,
      };
    }

    const petals: Petal[] = Array.from({ length: 30 }, () => spawn(true));

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      petals.forEach((p) => {
        p.wave += 0.02;
        p.x += p.vx + Math.sin(p.wave) * 0.4;
        p.y += p.vy;
        p.rot += p.drot;
        if (p.y > H + 20) Object.assign(p, spawn(false));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(loop);
    }

    function onResize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize);
    loop();
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} id="petals-canvas" />;
}

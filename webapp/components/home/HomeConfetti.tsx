"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

const COLORS = [
  "#B8975A",
  "#D4B483",
  "#EEE0C4",
  "#FFFFFF",
  "#F7F4EF",
  "#C9A96E",
  "#fff8ee",
];

type Piece = {
  x: number;
  y: number;
  w: number;
  h: number;
  col: string;
  rot: number;
  drot: number;
  vy: number;
  vx: number;
};

export type HomeConfettiHandle = {
  start: () => void;
  stop: () => void;
};

const HomeConfetti = forwardRef<HomeConfettiHandle>(function HomeConfetti(
  _props,
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    raf: number;
    active: boolean;
    pieces: Piece[];
    stopAt: number;
  }>({ raf: 0, active: false, pieces: [], stopAt: 0 });

  useImperativeHandle(ref, () => ({
    start: () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = (canvas.width = window.innerWidth);
      const H = (canvas.height = window.innerHeight);
      canvas.style.display = "block";
      stateRef.current.active = true;
      stateRef.current.pieces = Array.from({ length: 160 }, () => ({
        x: Math.random() * W,
        y: Math.random() * -H,
        w: 5 + Math.random() * 9,
        h: 3 + Math.random() * 5,
        col: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: Math.random() * Math.PI * 2,
        drot: (Math.random() - 0.5) * 0.14,
        vy: 2 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 1.5,
      }));
      stateRef.current.stopAt = Date.now() + 9000;

      function frame() {
        if (!stateRef.current.active) return;
        ctx!.clearRect(0, 0, W, H);
        stateRef.current.pieces.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.drot;
          if (p.y > H + 20) {
            p.y = -20;
            p.x = Math.random() * W;
          }
          ctx!.save();
          ctx!.translate(p.x, p.y);
          ctx!.rotate(p.rot);
          ctx!.fillStyle = p.col;
          ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx!.restore();
        });
        if (Date.now() > stateRef.current.stopAt) {
          stateRef.current.active = false;
          ctx!.clearRect(0, 0, W, H);
          canvas!.style.display = "none";
          return;
        }
        stateRef.current.raf = requestAnimationFrame(frame);
      }
      frame();
    },
    stop: () => {
      stateRef.current.active = false;
      if (stateRef.current.raf) cancelAnimationFrame(stateRef.current.raf);
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.display = "none";
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
  }));

  return <canvas ref={canvasRef} id="confetti-canvas" />;
});

export default HomeConfetti;

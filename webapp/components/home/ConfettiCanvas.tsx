"use client";

import { useImperativeHandle, useRef, forwardRef } from "react";

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

export type ConfettiHandle = {
  start: (durationMs?: number) => void;
};

const ConfettiCanvas = forwardRef<ConfettiHandle>(function ConfettiCanvas(
  _props,
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(false);
  const piecesRef = useRef<Piece[]>([]);
  const rafRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    start(durationMs = 9000) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.display = "block";
      activeRef.current = true;
      const pieces: Piece[] = [];
      for (let i = 0; i < 160; i++) {
        pieces.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          w: 5 + Math.random() * 9,
          h: 3 + Math.random() * 5,
          col: COLORS[Math.floor(Math.random() * COLORS.length)],
          rot: Math.random() * Math.PI * 2,
          drot: (Math.random() - 0.5) * 0.14,
          vy: 2 + Math.random() * 3,
          vx: (Math.random() - 0.5) * 1.5,
        });
      }
      piecesRef.current = pieces;

      function loop() {
        if (!activeRef.current || !ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of piecesRef.current) {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.drot;
          if (p.y > canvas.height + 20) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.col;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(loop);
      }
      loop();

      window.setTimeout(() => {
        activeRef.current = false;
        piecesRef.current = [];
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (canvas) canvas.style.display = "none";
      }, durationMs);
    },
  }));

  return <canvas ref={canvasRef} id="confetti-canvas" />;
});

export default ConfettiCanvas;

"use client";

import { useEffect, useRef } from "react";
import { drawPixelCat } from "@/lib/pixel-cat";

type Kitty = {
  left: string;
  top: string;
  scale: number;
  delay: string;
  opacity?: number;
  flip?: boolean;
};

const KITTIES: Kitty[] = [
  { left: "6%", top: "10%", scale: 0.72, delay: "0s", opacity: 0.55 },
  { left: "84%", top: "14%", scale: 0.58, delay: "1.1s", opacity: 0.5, flip: true },
  { left: "4%", top: "70%", scale: 0.68, delay: "0.7s", opacity: 0.48 },
  { left: "86%", top: "66%", scale: 0.78, delay: "1.9s", opacity: 0.52, flip: true },
  { left: "18%", top: "84%", scale: 0.46, delay: "1.4s", opacity: 0.4 },
  { left: "78%", top: "80%", scale: 0.5, delay: "0.3s", opacity: 0.42 },
  { left: "46%", top: "6%", scale: 0.38, delay: "2.2s", opacity: 0.32 },
  { left: "90%", top: "40%", scale: 0.34, delay: "1.7s", opacity: 0.28, flip: true },
];

function GateKitty({ kitty }: { kitty: Kitty }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (ref.current) drawPixelCat(ref.current, 7);
  }, []);

  return (
    <canvas
      ref={ref}
      className="gate-kitty"
      aria-hidden="true"
      style={{
        left: kitty.left,
        top: kitty.top,
        transform: `${kitty.flip ? "scaleX(-1) " : ""}scale(${kitty.scale})`,
        animationDelay: kitty.delay,
        opacity: kitty.opacity ?? 0.5,
      }}
    />
  );
}

export default function GateKitties() {
  return (
    <div className="gate-kitties" aria-hidden="true">
      {KITTIES.map((kitty, i) => (
        <GateKitty key={i} kitty={kitty} />
      ))}
    </div>
  );
}

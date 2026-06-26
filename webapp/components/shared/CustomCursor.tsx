"use client";

import { useEffect, useMemo, useRef } from "react";

const INTERACTIVE = 'a,button,input,textarea,select,label,[role="button"]';

// Cute black sitting kitty. The top-left pixel (left ear tip) is the
// cursor hotspot, so the cat trails down-right of the pointer like a
// normal arrow and clicking stays accurate.
const KITTY_GRID = [
  "X.........X",
  "XX.......XX",
  "XXX.....XXX",
  "XXXXXXXXXXX",
  "XXXXXXXXXXX",
  "XoXXXXXXXoX",
  "XXXXXXXXXXX",
  "XXXXXpXXXXX",
  ".XXXXXXXXX.",
  ".XXXXXXXXX.",
  ".XXXXXXXXX.",
  ".XXXXXXXXX.",
  "XXXXXXXXXXX",
  "XX.XXXXX.XX",
];

const KITTY_COLORS: Record<string, string> = {
  X: "#1a1320", // near-black ink silhouette
  o: "#ffe9f0", // soft eyes
  p: "#e23b4e", // tiny pink nose
};

export default function CustomCursor() {
  const kittyRef = useRef<HTMLDivElement | null>(null);

  const cells = useMemo(() => {
    const out: { x: number; y: number; fill: string }[] = [];
    for (let y = 0; y < KITTY_GRID.length; y++) {
      const row = KITTY_GRID[y];
      for (let x = 0; x < row.length; x++) {
        const fill = KITTY_COLORS[row[x]];
        if (fill) out.push({ x, y, fill });
      }
    }
    return out;
  }, []);

  useEffect(() => {
    const kitty = kittyRef.current;
    if (!kitty) return;

    // Native cursor is fine on touch / coarse-pointer devices.
    if (window.matchMedia("(pointer: coarse)").matches) {
      kitty.style.display = "none";
      return;
    }

    const onMove = (e: MouseEvent) => {
      kitty.style.left = `${e.clientX}px`;
      kitty.style.top = `${e.clientY}px`;
      if (!kitty.classList.contains("visible")) kitty.classList.add("visible");
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.(INTERACTIVE)) kitty.classList.add("perk");
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.(INTERACTIVE)) kitty.classList.remove("perk");
    };
    const onLeave = () => kitty.classList.remove("visible");
    const onEnter = () => kitty.classList.add("visible");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  const cols = KITTY_GRID[0].length;
  const rows = KITTY_GRID.length;

  return (
    <div ref={kittyRef} className="cursor-kitty" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${cols} ${rows}`}
        shapeRendering="crispEdges"
        focusable="false"
      >
        {cells.map((c) => (
          <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width="1" height="1" fill={c.fill} />
        ))}
      </svg>
    </div>
  );
}

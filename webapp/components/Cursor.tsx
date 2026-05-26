"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const dot = document.getElementById("cur-dot");
    const ring = document.getElementById("cur-ring");

    if (!dot || !ring) {
      return;
    }

    const move = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      dot.style.left = `${clientX}px`;
      dot.style.top = `${clientY}px`;
      ring.style.left = `${clientX}px`;
      ring.style.top = `${clientY}px`;
    };

    const activate = () => setActive(true);
    const deactivate = () => setActive(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", activate);
    window.addEventListener("mouseup", deactivate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", activate);
      window.removeEventListener("mouseup", deactivate);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" id="cur-dot" />
      <div className={`cursor-ring ${active ? "active" : ""}`} id="cur-ring" />
    </>
  );
}

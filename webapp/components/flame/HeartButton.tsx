"use client";

import { useRef, type MouseEvent } from "react";

type HeartButtonProps = {
  name: string;
  tapped: boolean;
  status: string;
  disabled?: boolean;
  onTap: () => void;
};

export default function HeartButton({
  name,
  tapped,
  status,
  disabled,
  onTap,
}: HeartButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    const btn = buttonRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("div");
      ripple.className = "ripple";
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${(rect.width - size) / 2}px;top:${(rect.height - size) / 2}px`;
      btn.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    }
    onTap();
    event.preventDefault();
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`heart-btn${tapped ? " tapped" : ""}`}
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={tapped}
    >
      <div className="heart-icon">{tapped ? "♥" : "♡"}</div>
      <div className="heart-name">{name}</div>
      <div className="heart-status-text">{status}</div>
    </button>
  );
}

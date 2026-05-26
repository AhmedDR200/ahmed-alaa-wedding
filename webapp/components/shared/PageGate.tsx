"use client";

import type { ReactNode } from "react";
import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";

type PageGateProps = {
  storageKey: string;
  password: string;
  title: string;
  subtitle?: string;
  decoration?: ReactNode;
  errorMessage?: string;
  onUnlock?: () => void;
  children: ReactNode;
};

function subscribeToStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function PageGate({
  storageKey,
  password,
  title,
  subtitle,
  decoration,
  errorMessage = "That's not the secret ♡",
  onUnlock,
  children,
}: PageGateProps) {
  const storedUnlocked = useSyncExternalStore(
    subscribeToStorage,
    () => sessionStorage.getItem(storageKey) === "yes",
    () => false,
  );
  const [manuallyUnlocked, setManuallyUnlocked] = useState(false);
  const unlocked = storedUnlocked || manuallyUnlocked;

  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [value, setValue] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!unlocked) return;
    const timer = window.setTimeout(() => setHidden(true), 800);
    return () => window.clearTimeout(timer);
  }, [unlocked]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (value.trim().toLowerCase() === password) {
      sessionStorage.setItem(storageKey, "yes");
      setManuallyUnlocked(true);
      onUnlock?.();
      return;
    }
    setValue("");
    setError(errorMessage);
    setShaking(false);
    requestAnimationFrame(() => setShaking(true));
    window.setTimeout(() => setError(""), 2400);
  }

  return (
    <>
      {!hidden && (
        <div id="gate" className={unlocked ? "hide" : ""}>
          <div className="gate-inner">
            <div className="gate-mono">A &amp; A</div>
            <div className="gate-title">{title}</div>
            {subtitle && <div className="gate-sub">{subtitle}</div>}
            {decoration}
            <form
              className={`gate-field${shaking ? " shake" : ""}`}
              onAnimationEnd={() => setShaking(false)}
              onSubmit={submit}
            >
              <input
                type="password"
                placeholder="Enter your secret"
                autoComplete="off"
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit" aria-label="Enter">
                →
              </button>
            </form>
            <div className="gate-error">{error}</div>
          </div>
        </div>
      )}
      {unlocked ? children : null}
    </>
  );
}

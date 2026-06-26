"use client";

import type { ReactNode } from "react";
import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import GateKitties from "@/components/shared/GateKitties";
import { useLanguage } from "@/lib/i18n";

type PageGateProps = {
  storageKey: string;
  password: string;
  title: string;
  subtitle?: string;
  hint?: string;
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
  hint,
  decoration,
  errorMessage = "That's not the secret ♡",
  onUnlock,
  children,
}: PageGateProps) {
  const { lang } = useLanguage();
  const pathname = usePathname();
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

  // Reset all transient gate state on every client-side navigation. The App
  // Router keeps components mounted across soft navigations, so without this
  // the `hidden`/`manuallyUnlocked` latches (and any in-flight shake/error)
  // would carry over from the previous route and leave the gate stuck until a
  // full page reload. `storedUnlocked` re-reads sessionStorage for the current
  // page on its own, so dropping `manuallyUnlocked` here never re-locks a page
  // that was genuinely unlocked.
  useEffect(() => {
    setManuallyUnlocked(false);
    setHidden(false);
    setError("");
    setShaking(false);
    setValue("");
  }, [pathname, storageKey]);

  useEffect(() => {
    if (!unlocked) {
      setHidden(false);
      return;
    }
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
          <GateKitties />
          <div className="gate-inner">
            <div className="gate-mono">A &amp; A</div>
            <div className="gate-title">{title}</div>
            {subtitle && <div className="gate-sub">{subtitle}</div>}
            {decoration}

            <div className="gate-window">
              <div className="gate-window-bar">
                <span className="gate-window-label">
                  {lang === "ar" ? "سرّ" : "SECRET"}
                </span>
                <span className="gate-window-dots" aria-hidden="true">
                  <b>_</b>
                  <b>□</b>
                  <b>×</b>
                </span>
              </div>
              <div className="gate-window-strip" aria-hidden="true">
                ♥ <i>·</i> ♥ <i>·</i> ♥
              </div>
              <div className="gate-window-body">
                <form onSubmit={submit}>
                  <label className="gate-input-label" htmlFor="gate-password">
                    {lang === "ar" ? "السرّ بيننا" : "Enter your secret"}
                  </label>
                  <div
                    className={`gate-field${shaking ? " shake" : ""}`}
                    onAnimationEnd={() => setShaking(false)}
                  >
                    <input
                      id="gate-password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="off"
                      autoFocus
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <button type="submit" className="gate-submit" aria-label="Enter">
                      ♥
                    </button>
                  </div>
                  <div className="gate-error">{error}</div>
                  {hint && <div className="gate-hint">{hint}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {unlocked ? children : null}
    </>
  );
}

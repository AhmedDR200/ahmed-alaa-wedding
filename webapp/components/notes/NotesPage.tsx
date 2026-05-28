"use client";

import "@/styles/legacy/notes.css";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import LegacyTopnav from "@/components/shared/LegacyTopnav";
import PageGate from "@/components/shared/PageGate";
import { useLanguage } from "@/lib/i18n";
import { NOTES, NOTES_START_KEY } from "./NotesData";

const TZ = "Africa/Cairo";
const OPENED_KEY = "notes_opened_v1";
const OPENED_EVENT = "magdy:notes-opened";

const T = {
  en: {
    eyebrow: "One little letter a day",
    title: "Notes",
    sub: "A new note unlocks each morning — for you, Alaa",
    progress: (open: number, total: number) => `${open} of ${total} unlocked`,
    note: "Note",
    opensIn: (d: number) =>
      d === 1 ? "Unlocks tomorrow" : `Unlocks in ${d} days`,
    open: "Open",
    newBadge: "New",
    today: "Today's note",
    close: "Close",
    gateTitle: "Notes",
    gateSub: "A little letter, every day",
    foot: "Written for you, one day at a time",
  },
  ar: {
    eyebrow: "رسالة صغيرة كل يوم",
    title: "رسائل",
    sub: "تُفتح رسالة جديدة كل صباح — لكِ يا آلاء",
    progress: (open: number, total: number) => `${open} من ${total} مفتوحة`,
    note: "رسالة",
    opensIn: (d: number) =>
      d === 1 ? "تُفتح غداً" : `تُفتح بعد ${d} أيام`,
    open: "افتحي",
    newBadge: "جديدة",
    today: "رسالة اليوم",
    close: "إغلاق",
    gateTitle: "رسائل",
    gateSub: "رسالة صغيرة، كل يوم",
    foot: "كُتبت لكِ، يوماً بيوم",
  },
} as const;

function cairoDayKey(d = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const o: Record<string, string> = {};
  for (const p of parts) o[p.type] = p.value;
  return `${o.year}-${o.month}-${o.day}`;
}

function daysBetween(fromKey: string, toKey: string): number {
  const [ay, am, ad] = fromKey.split("-").map(Number);
  const [by, bm, bd] = toKey.split("-").map(Number);
  return Math.round(
    (Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000,
  );
}

function subscribeOpened(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(OPENED_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(OPENED_EVENT, callback);
  };
}

function getOpenedSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(OPENED_KEY) || "[]";
}

function NotesView() {
  const { lang } = useLanguage();
  const t = T[lang];

  const unlockedCount = useMemo(() => {
    const elapsed = daysBetween(NOTES_START_KEY, cairoDayKey());
    return Math.max(0, Math.min(NOTES.length, elapsed + 1));
  }, []);

  const openedRaw = useSyncExternalStore(
    subscribeOpened,
    getOpenedSnapshot,
    () => "[]",
  );
  const opened = useMemo<Set<number>>(() => {
    try {
      const arr = JSON.parse(openedRaw);
      return new Set(Array.isArray(arr) ? (arr as number[]) : []);
    } catch {
      return new Set();
    }
  }, [openedRaw]);

  const [active, setActive] = useState<number | null>(null);

  const openNote = useCallback(
    (index: number) => {
      if (index >= unlockedCount) return;
      setActive(index);
      if (!opened.has(index)) {
        const next = [...opened, index];
        try {
          window.localStorage.setItem(OPENED_KEY, JSON.stringify(next));
          window.dispatchEvent(new Event(OPENED_EVENT));
        } catch {
          // ignore quota errors
        }
      }
    },
    [opened, unlockedCount],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeNote = active !== null ? NOTES[active] : null;

  return (
    <>
      <LegacyTopnav />
      <div className="notes-page">
        <div className="notes-header">
          <div className="notes-eyebrow">{t.eyebrow}</div>
          <h1 className="notes-title">{t.title}</h1>
          <p className="notes-sub">{t.sub}</p>
          <div className="notes-progress">
            {t.progress(unlockedCount, NOTES.length)}
          </div>
        </div>

        <div className="notes-grid">
          {NOTES.map((note, i) => {
            const unlocked = i < unlockedCount;
            const isNew = unlocked && !opened.has(i);
            const isLatest = i === unlockedCount - 1;
            if (!unlocked) {
              const inDays = daysBetween(cairoDayKey(), addDaysKey(i));
              return (
                <div
                  key={i}
                  className="note-card locked"
                  aria-disabled="true"
                >
                  <div className="note-num">
                    {t.note} {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="note-lock" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                  </div>
                  <div className="note-locked-label">
                    {inDays > 0 ? t.opensIn(inDays) : t.opensIn(1)}
                  </div>
                </div>
              );
            }
            return (
              <button
                key={i}
                type="button"
                className={`note-card unlocked${isLatest ? " latest" : ""}`}
                onClick={() => openNote(i)}
              >
                {isNew && <span className="note-new">{t.newBadge}</span>}
                <div className="note-num">
                  {t.note} {String(i + 1).padStart(2, "0")}
                </div>
                <div className="note-card-title">{note.title[lang]}</div>
                <div className="note-open-cue">
                  {isLatest ? t.today : t.open}
                  <span aria-hidden="true"> →</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="notes-foot">
          <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp; <span>{t.foot}</span>
        </div>
      </div>

      <div
        className={`note-modal${activeNote ? " show" : ""}`}
        onClick={() => setActive(null)}
        aria-hidden={activeNote ? "false" : "true"}
      >
        {activeNote && (
          <div
            className="note-paper"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="note-paper-mono">A &amp; A</div>
            <div className="note-paper-title">{activeNote.title[lang]}</div>
            <p className="note-paper-body">{activeNote.body[lang]}</p>
            <div className="note-paper-sign">Ahmed</div>
            <button
              type="button"
              className="note-paper-close"
              onClick={() => setActive(null)}
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/** YYYY-MM-DD for the day note #index unlocks. */
function addDaysKey(index: number): string {
  const [y, m, d] = NOTES_START_KEY.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + index));
  return date.toISOString().slice(0, 10);
}

export default function NotesPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <PageGate
      storageKey="notes_auth_v1"
      password="one-a-day"
      title={t.gateTitle}
      subtitle={t.gateSub}
    >
      <NotesView />
    </PageGate>
  );
}

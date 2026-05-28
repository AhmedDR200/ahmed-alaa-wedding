"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { useLanguage } from "@/lib/i18n";
import {
  getMe,
  otherOf,
  pingPresence,
  readPresence,
  setMe,
  ONLINE_WINDOW_MS,
  type Person,
  type PresenceMap,
} from "@/lib/presence";

const POLL_MS = 45_000;

const T = {
  en: {
    here: (n: string) => `${n} is here now`,
    seen: (n: string, ago: string) => `${n} was here ${ago}`,
    never: (n: string) => `${n} hasn't visited yet`,
    whoAreYou: "Who's here?",
    name: (p: Person) => (p === "ahmed" ? "Ahmed" : "Alaa"),
    ago: (ts: number, now: number) => {
      const min = Math.round((now - ts) / 60000);
      if (min < 60) return `${min}m ago`;
      const h = Math.round(min / 60);
      if (h < 24) return `${h}h ago`;
      const d = Math.round(h / 24);
      return d < 7 ? `${d}d ago` : "a while ago";
    },
  },
  ar: {
    here: (n: string) => `${n} هنا الآن`,
    seen: (n: string, ago: string) => `${n} كان هنا ${ago}`,
    never: (n: string) => `${n} لم يزر بعد`,
    whoAreYou: "مَن هنا؟",
    name: (p: Person) => (p === "ahmed" ? "أحمد" : "آلاء"),
    ago: (ts: number, now: number) => {
      const min = Math.round((now - ts) / 60000);
      if (min < 60) return `منذ ${min} د`;
      const h = Math.round(min / 60);
      if (h < 24) return `منذ ${h} س`;
      const d = Math.round(h / 24);
      return d < 7 ? `منذ ${d} يوم` : "منذ فترة";
    },
  },
} as const;

function subscribeStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function useMe(): Person | null {
  return useSyncExternalStore(subscribeStorage, getMe, () => null);
}

export default function PresenceBadge() {
  const { lang } = useLanguage();
  const t = T[lang];
  const me = useMe();
  const [presence, setPresence] = useState<PresenceMap>({});
  const [now, setNow] = useState(0);
  const pingedRef = useRef(false);

  // Heartbeat + poll while identity is known.
  useEffect(() => {
    if (!me) return;
    let cancelled = false;

    const beat = async () => {
      const next = await pingPresence(me);
      if (cancelled) return;
      setPresence(next);
      setNow(Date.now());
    };
    const poll = async () => {
      const next = await readPresence();
      if (cancelled) return;
      setPresence(next);
      setNow(Date.now());
    };

    if (!pingedRef.current) {
      pingedRef.current = true;
      beat();
    } else {
      poll();
    }

    const onVisible = () => {
      if (document.visibilityState === "visible") beat();
    };
    document.addEventListener("visibilitychange", onVisible);
    const interval = window.setInterval(beat, POLL_MS);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(interval);
    };
  }, [me]);

  // Refresh the clock every 30s so "5m ago" / online status stays current.
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const pick = useCallback((who: Person) => setMe(who), []);

  if (!me) {
    return (
      <div className="presence presence-pick" aria-label={t.whoAreYou}>
        <span className="presence-pick-label">{t.whoAreYou}</span>
        <button type="button" onClick={() => pick("ahmed")}>
          {t.name("ahmed")}
        </button>
        <span className="presence-pick-sep">·</span>
        <button type="button" onClick={() => pick("alaa")}>
          {t.name("alaa")}
        </button>
      </div>
    );
  }

  const partner = otherOf(me);
  const partnerName = t.name(partner);
  const last = presence[partner];
  const online = typeof last === "number" && now - last < ONLINE_WINDOW_MS;

  let label: string;
  if (online) label = t.here(partnerName);
  else if (typeof last === "number") label = t.seen(partnerName, t.ago(last, now));
  else label = t.never(partnerName);

  return (
    <div
      className={`presence${online ? " is-online" : ""}`}
      title={label}
      aria-live="polite"
    >
      <span className="presence-dot" aria-hidden="true" />
      <span className="presence-text">{label}</span>
    </div>
  );
}

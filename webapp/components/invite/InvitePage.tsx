"use client";

import "@/styles/legacy/invite.css";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { burstConfetti } from "@/lib/confetti";
import { useLanguage } from "@/lib/i18n";

const T = {
  en: {
    eyebrow: "Together with their families",
    flipHint: "Tap the photo · Then & Now",
    inviteLine:
      "request the honour of your presence at the celebration of their wedding",
    weekday: "Tuesday",
    month: "August",
    time: "6:00 PM",
    venueName: "Marly Hall",
    venueAddr: "Armed Forces Club · Ras El Bar · Damietta",
    addCal: "Add to Calendar",
    openMap: "Open in Maps",
    cdEyebrow: "Until We Say I Do",
    days: "Days",
    hours: "Hours",
    mins: "Minutes",
    secs: "Seconds",
    today: "Today Is The Day",
    closing: "Your presence is the greatest gift of all.",
    madeWith: "Made with love",
    langLabel: "عربي",
  },
  ar: {
    eyebrow: "بصُحبة عائلتيهما",
    flipHint: "اضغط على الصورة · زمان والآن",
    inviteLine: "يتشرّفان بدعوتكم لمشاركتهما فرحة العمر",
    weekday: "الثلاثاء",
    month: "أغسطس",
    time: "٦:٠٠ مساءً",
    venueName: "قاعة مارلي",
    venueAddr: "نادي القوات المسلحة · رأس البر · دمياط",
    addCal: "أضِف للتقويم",
    openMap: "افتح الخريطة",
    cdEyebrow: "حتى يحين موعد الزفاف",
    days: "أيام",
    hours: "ساعات",
    mins: "دقائق",
    secs: "ثواني",
    today: "اليوم هو اليوم",
    closing: "حضوركم أغلى هدية.",
    madeWith: "صُنع بحب",
    langLabel: "English",
  },
} as const;

const ICS_LINES = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Ahmed and Alaa//Wedding Invite//EN",
  "CALSCALE:GREGORIAN",
  "METHOD:PUBLISH",
  "BEGIN:VEVENT",
  "UID:ahmed-alaa-2026-08-25@ahmed-loves-alaa.space",
  "DTSTAMP:20260513T000000Z",
  "DTSTART:20260825T160000Z",
  "DTEND:20260825T220000Z",
  "SUMMARY:Ahmed & Alaa — Wedding",
  "DESCRIPTION:With joyful hearts\\, Ahmed & Alaa invite you to celebrate their wedding at Marly Hall\\, Ras El Bar\\, Damietta.",
  "LOCATION:Marly Hall\\, Armed Forces Club\\, Ras El Bar\\, Damietta",
  "URL:https://maps.app.goo.gl/nd7HixpkUrvGGNts7",
  "BEGIN:VALARM",
  "TRIGGER:-PT1H",
  "ACTION:DISPLAY",
  "DESCRIPTION:Ahmed & Alaa Wedding starts in 1 hour",
  "END:VALARM",
  "END:VEVENT",
  "END:VCALENDAR",
];

const CONFETTI_KEY = "aa-invite-confetti";

import InviteCountdown from "@/components/invite/InviteCountdown";

export default function InvitePage() {
  const { lang, toggle } = useLanguage();
  const t = T[lang];
  const search = useSearchParams();
  const [flipped, setFlipped] = useState(false);
  const [calHref, setCalHref] = useState<string>("#");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dear = useMemo(() => {
    const raw = search.get("to");
    if (!raw) return "";
    const cleaned = raw.replace(/[<>&"]/g, "").slice(0, 32).trim();
    if (!cleaned) return "";
    return lang === "ar" ? `عزيزي/عزيزتي ${cleaned}،` : `Dear ${cleaned},`;
  }, [search, lang]);

  useEffect(() => {
    const blob = new Blob([ICS_LINES.join("\r\n")], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const id = window.setTimeout(() => setCalHref(url), 0);
    return () => {
      window.clearTimeout(id);
      URL.revokeObjectURL(url);
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(CONFETTI_KEY)) return;
    sessionStorage.setItem(CONFETTI_KEY, "1");
    const id = window.setTimeout(() => {
      if (canvasRef.current) burstConfetti(canvasRef.current, 90);
    }, 1300);
    return () => window.clearTimeout(id);
  }, []);

  const celebrate = useCallback(() => {
    if (canvasRef.current) burstConfetti(canvasRef.current, 180);
  }, []);

  function flipPortrait() {
    setFlipped((v) => !v);
  }

  function onPortraitKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flipPortrait();
    }
  }

  return (
    <>
      <div className="bg-photo" aria-hidden="true" />
      <div className="bg-veil" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="topbar">
        <Link className="brand" href="/" aria-label="A & A">
          A &amp; A
        </Link>
        <button className="lang-btn" id="lang-btn" onClick={toggle}>
          {t.langLabel}
        </button>
      </header>

      <main className="invite-wrap">
        <article className="card reveal in">
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />

          <div
            className="bismillah"
            lang="ar"
            dir="rtl"
            aria-label="Quran Ar-Rum 21"
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَة
          </div>
          <span className="ayah-cite">Ar-Rum · 21</span>

          <div className="eyebrow">{t.eyebrow}</div>

          <div
            className={`portrait-frame${flipped ? " flipped" : ""}`}
            onClick={flipPortrait}
            onKeyDown={onPortraitKey}
            role="button"
            tabIndex={0}
            aria-label="Tap to flip — then and now"
          >
            <div className="portrait-inner">
              <div className="portrait-face front">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/kids.png"
                  alt="Ahmed and Alaa as children"
                  loading="eager"
                />
              </div>
              <div className="portrait-face back">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/now.jpg"
                  alt="Ahmed and Alaa today"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <div className="flip-hint">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            <span>{t.flipHint}</span>
          </div>

          {dear && (
            <div className="dear show" id="dear-line">
              {dear}
            </div>
          )}

          <h1 className="names" id="names">
            {lang === "ar" ? (
              <>
                أحمد <em className="amp">و</em> آلاء
              </>
            ) : (
              <>
                Ahmed <em className="amp">&amp;</em> Alaa
              </>
            )}
          </h1>

          <p className="invite-line">{t.inviteLine}</p>

          <div className="ornament">
            <span className="orn-line" />
            <span className="orn-diamond" />
            <span className="orn-line" />
          </div>

          <div className="date-block">
            <div className="weekday">{t.weekday}</div>
            <div className="date-main">
              <span className="d-month">{t.month}</span>
              <span className="d-day">25</span>
              <span className="d-year">2026</span>
            </div>
            <div className="time">{t.time}</div>
          </div>

          <div className="venue">
            <div className="venue-name">{t.venueName}</div>
            <div className="venue-addr">{t.venueAddr}</div>
          </div>

          <div className="cta-row">
            <a
              className="btn"
              id="cal-btn"
              href={calHref}
              download="ahmed-and-alaa.ics"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{t.addCal}</span>
            </a>
            <a
              className="btn btn-ghost"
              href="https://maps.app.goo.gl/nd7HixpkUrvGGNts7"
              target="_blank"
              rel="noreferrer noopener"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{t.openMap}</span>
            </a>
          </div>
        </article>

        <InviteCountdown
          labels={{
            eyebrow: t.cdEyebrow,
            days: t.days,
            hours: t.hours,
            mins: t.mins,
            secs: t.secs,
            today: t.today,
          }}
          onCelebrate={celebrate}
        />

        <p className="closing">{t.closing}</p>
      </main>

      <footer>
        <div className="foot-orn">
          <span className="orn-line" />
          <span className="orn-diamond" />
          <span className="orn-line" />
        </div>
        <div className="foot-main">
          <strong>Ahmed &amp; Alaa</strong> · August 25, 2026
        </div>
        <div className="foot-sub">{t.madeWith}</div>
        <Link className="foot-link" href="/" aria-label="hidden">
          ·
        </Link>
      </footer>

      <canvas ref={canvasRef} id="confetti" aria-hidden="true" />
    </>
  );
}

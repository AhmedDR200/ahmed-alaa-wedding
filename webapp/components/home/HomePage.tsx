"use client";

import "@/styles/legacy/index.css";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ConfettiCanvas, {
  type ConfettiHandle,
} from "@/components/home/ConfettiCanvas";
import CountdownStats from "@/components/home/CountdownStats";
import HeroParallax from "@/components/home/HeroParallax";
import PetalsCanvas from "@/components/home/PetalsCanvas";
import Reveal from "@/components/home/Reveal";
import ScrollProgress from "@/components/home/ScrollProgress";
import StreakWidget from "@/components/home/StreakWidget";
import LegacyTopnav from "@/components/shared/LegacyTopnav";
import { useLanguage } from "@/lib/i18n";
import { LETTER_PARAS, REASONS, T, TIMELINE } from "./HomeData";

const TZ = "Africa/Cairo";

function cairoLongDate(lang: "en" | "ar"): string {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function cairoDayKey(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const o: Record<string, string> = {};
  for (const p of parts) o[p.type] = p.value;
  return `${o.year}-${o.month}-${o.day}`;
}

function HomeView() {
  const { lang } = useLanguage();
  const t = T[lang];

  const confettiRef = useRef<ConfettiHandle>(null);
  const [milestone, setMilestone] = useState<{
    text: string;
    show: boolean;
  } | null>(null);
  const milestoneTimer = useRef<number | null>(null);

  const showMilestone = useCallback(
    (days: number) => {
      if (milestoneTimer.current) window.clearTimeout(milestoneTimer.current);
      setMilestone({ text: t.milestone(days), show: true });
      milestoneTimer.current = window.setTimeout(
        () => setMilestone((m) => (m ? { ...m, show: false } : null)),
        7000,
      );
    },
    [t],
  );

  const onWeddingDay = useCallback(() => {
    confettiRef.current?.start();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.shiftKey && event.key === "M") showMilestone(100);
      if (event.shiftKey && event.key === "C") confettiRef.current?.start();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showMilestone]);

  // Daily whisper: pick a reason title once per Cairo day, persist in session
  const whisper = useMemo(() => {
    if (typeof window === "undefined") return REASONS[0].title;
    const day = cairoDayKey();
    let idx = NaN;
    try {
      if (sessionStorage.getItem("home_whisper_day") === day) {
        idx = parseInt(sessionStorage.getItem("home_whisper_idx") ?? "", 10);
      }
    } catch {
      // ignore
    }
    if (Number.isNaN(idx) || idx < 0 || idx >= REASONS.length) {
      idx = Math.floor(Math.random() * REASONS.length);
      try {
        sessionStorage.setItem("home_whisper_day", day);
        sessionStorage.setItem("home_whisper_idx", String(idx));
      } catch {
        // ignore
      }
    }
    return REASONS[idx].title;
  }, []);

  const letterPS = useMemo(() => {
    if (typeof window === "undefined") return "";
    return t.psLabel(cairoLongDate(lang));
  }, [lang, t]);

  return (
    <div className="home-page">
      <ScrollProgress />
      <LegacyTopnav />
      <Reveal />
      <HeroParallax />
      <PetalsCanvas />
      <ConfettiCanvas ref={confettiRef} />

      <div
        className={`milestone-banner${milestone?.show ? " show" : ""}`}
        id="milestone-banner"
      >
        <span className="milestone-text">{milestone?.text ?? ""}</span>
        <button
          className="milestone-close"
          onClick={() => setMilestone((m) => (m ? { ...m, show: false } : null))}
        >
          ✕
        </button>
      </div>

      <section className="hero">
        <div className="hero-bg" id="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="monogram">
            <div className="monogram-line" />
            <div className="monogram-circle">
              {lang === "ar" ? "أ & أ" : "A & A"}
            </div>
            <div className="monogram-line" />
          </div>
          <div className="hero-names">
            {lang === "ar" ? (
              <>
                أحمد <em>&amp;</em> آلاء
              </>
            ) : (
              <>
                Ahmed <em>&amp;</em> Alaa
              </>
            )}
          </div>
          <div className="hero-date-line">
            <span>{t.heroDate}</span>
          </div>
        </div>
        <div className="scroll-cue">
          <span>{t.scroll}</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      <CountdownStats
        labels={{
          eyebrow: t.cdEyebrow,
          days: t.days,
          hours: t.hours,
          mins: t.mins,
          secs: t.secs,
          weekendsLeft: t.weekendsLeft,
          sleepsToGo: t.sleepsToGo,
          fridaysToPlan: t.fridaysToPlan,
          todayIsTheDay: t.todayIsTheDay,
          ahmedAndAlaa: t.ahmedAndAlaa,
          weddingDate: t.letterDate,
        }}
        onMilestone={showMilestone}
        onWeddingDay={onWeddingDay}
      />

      <StreakWidget
        labels={{
          heading: { prefix: t.journeyHeadingPrefix, em: t.journeyHeadingEm },
          sub: t.journeySub,
          dayStreak: t.dayStreak,
          bestStreak: t.bestStreak,
          daysHere: t.daysHere,
          less: t.less,
          more: t.more,
        }}
      />

      <div className="quote-section reveal">
        <div className="quote-text">{t.quote}</div>
        <div className="quote-attr">{t.quoteAttr}</div>
      </div>

      <div className="story-section section-wrap reveal">
        <div className="section-heading">
          {t.storyHeadingPrefix} <em>{t.storyHeadingEm}</em>
        </div>
        <div className="section-sub">{t.storySub}</div>
        <div className="story-timeline reveal reveal-stagger">
          {TIMELINE.map((item) => (
            <article key={item.title.en} className="story-card">
              <header className="story-card-bar">
                <span className="story-card-date">{item.date[lang]}</span>
                <span className="story-card-dots" aria-hidden="true">
                  <b>_</b>
                  <b>□</b>
                  <b>×</b>
                </span>
              </header>
              <div className="story-card-strip" aria-hidden="true">
                ♥ <i>·</i> ♥ <i>·</i> ♥
              </div>
              <div className="story-card-body">
                <h3 className="story-card-title">{item.title[lang]}</h3>
                <p className="story-card-desc">{item.desc[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="reasons-section">
        <div className="section-wrap reveal">
          <div className="section-heading">
            {t.reasonsHeadingPrefix} <em>{t.reasonsHeadingEm}</em>
          </div>
          <div className="section-sub">{t.reasonsSub}</div>
          <div className="reasons-grid" id="reasons-grid">
            {REASONS.map((r, i) => (
              <div key={r.title.en} className="reason-item">
                <div className="reason-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="reason-body">
                  <div className="reason-title">{r.title[lang]}</div>
                  <div className="reason-desc">{r.desc[lang]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="letter-section">
        <div className="section-wrap reveal">
          <div className="section-heading">
            {t.letterHeadingPrefix} <em>{t.letterHeadingEm}</em>
            {t.letterHeadingSuffix && ` ${t.letterHeadingSuffix}`}
          </div>
          <div className="section-sub">{t.letterSub}</div>
          <div className="letter-paper">
            <div className="letter-monogram">
              <div className="letter-monogram-circle">A &amp; A</div>
            </div>
            <div className="letter-date">{t.letterDate}</div>
            <div className="letter-salutation">{t.letterSalutation}</div>
            {LETTER_PARAS.map((para, i) => (
              <p key={i} className="letter-body">
                {para[lang]}
              </p>
            ))}
            <div className="letter-closing">
              <span className="letter-closing-line">{t.letterClosing}</span>
              <span className="letter-signature">Ahmed</span>
            </div>
            <p className="letter-ps">{letterPS}</p>
            <p className="letter-ar-only" lang="ar">
              هذه الصفحة لنا وحدنا — وكل تفصيل فيها صُنع لكِ.
            </p>
            <div className="letter-seal">A &amp; A</div>
          </div>
        </div>
      </div>

      <div className="daily-whisper-wrap reveal">
        <div
          className="ornament"
          style={{ margin: "0 auto 8px", maxWidth: "220px" }}
        >
          <div className="ornament-line" />
          <div className="ornament-diamond" />
          <div className="ornament-line" />
        </div>
        <div
          className="section-eyebrow daily-whisper-eyebrow"
          style={{ marginBottom: 14 }}
        >
          {t.todaysThought}
        </div>
        <p className="daily-whisper-line">{whisper[lang]}</p>
      </div>

      <footer>
        <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp; {t.letterDate} &nbsp;·&nbsp;
        <span>{t.madeWith}</span>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return <HomeView />;
}

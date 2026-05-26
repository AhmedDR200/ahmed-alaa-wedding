"use client";

import "@/styles/legacy/us.css";

import { useEffect, useMemo, useRef } from "react";

import LegacyTopnav from "@/components/shared/LegacyTopnav";
import PageGate from "@/components/shared/PageGate";
import { useLanguage } from "@/lib/i18n";

type Moment = {
  date: string;
  dateLabel: { en: string; ar: string };
  title: { en: string; ar: string };
  caption: { en: string; ar: string };
  photos: string[];
};

const MOMENTS: Moment[] = [
  {
    date: "2025-12-26",
    dateLabel: { en: "26 December 2025", ar: "٢٦ ديسمبر ٢٠٢٥" },
    title: { en: "Our First Cinema", ar: "أوّل سينما لنا" },
    caption: {
      en: "Galaxy · Zootopia 2 — the first night we sat side by side.",
      ar: "جالاكسي · زوتوبيا ٢ — أوّل ليلةٍ جلسنا فيها جنباً إلى جنب.",
    },
    photos: ["/img/us/ticket.jpg"],
  },
  {
    date: "2026-01-04",
    dateLabel: { en: "4 January 2026", ar: "٤ يناير ٢٠٢٦" },
    title: { en: "My Birthday", ar: "عيد ميلادي" },
    caption: {
      en: "Three gifts she chose for me — Thousand Sunny, Zoro, and the Sony.",
      ar: "ثلاثُ هدايا اختارتها لي — ثاوزند ساني، زورو، وسوني.",
    },
    photos: [
      "/img/us/figurine.jpg",
      "/img/us/zoro.jpg",
      "/img/us/headphones.jpg",
    ],
  },
];

const T = {
  en: {
    eyebrow: "Our story, one moment at a time",
    title: "Us",
    dedication: "This is how it begins. More to come, side by side.",
    foot: "August 25, 2026",
    gateTitle: "Us",
    gateSub: "Four little pieces of our world",
    gateHint: "Hint: you and me, joined",
  },
  ar: {
    eyebrow: "قصّتنا، لحظةً تلو لحظة",
    title: "نحن",
    dedication: "هكذا بدأت. والمزيد قادم، جنباً إلى جنب.",
    foot: "٢٥ أغسطس ٢٠٢٦",
    gateTitle: "نحن",
    gateSub: "أربع قطعٍ من عالمنا",
    gateHint: "تلميح: أنتِ وأنا، معاً",
  },
} as const;

const GATE_MOSAIC = (
  <div className="gate-mosaic" aria-hidden="true">
    <span />
    <span />
    <span />
    <span />
  </div>
);

function UsView() {
  const { lang } = useLanguage();
  const t = T[lang];
  const timelineRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(
    () => [...MOMENTS].sort((a, b) => a.date.localeCompare(b.date)),
    [],
  );

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(".tl-item");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <LegacyTopnav />
      <div className="page">
        <div className="header-block">
          <div className="header-eyebrow">{t.eyebrow}</div>
          <h1 className="header-title">{t.title}</h1>
        </div>

        <div
          className="timeline"
          id="timeline"
          ref={timelineRef}
          aria-label="A timeline of our moments"
        >
          {sorted.map((moment, i) => (
            <article
              key={moment.date}
              className={`tl-item${i % 2 === 1 ? " right" : ""}`}
              data-index={i}
            >
              <span className="tl-node" aria-hidden="true" />
              <div className="tl-card">
                <span className="tl-date">{moment.dateLabel[lang]}</span>
                <h3 className="tl-title">{moment.title[lang]}</h3>
                <p className="tl-caption">{moment.caption[lang]}</p>
                {moment.photos.length > 0 && (
                  <div className="tl-photos" data-count={moment.photos.length}>
                    {moment.photos.map((src) => (
                      <div key={src} className="tl-photo">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="dedication">{t.dedication}</p>

        <div className="ornament">
          <div className="ornament-line" />
          <div className="ornament-diamond" />
          <div className="ornament-line" />
        </div>

        <div className="page-foot">
          <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp;
          <span>{t.foot}</span>
        </div>
      </div>
    </>
  );
}

export default function UsPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <PageGate
      storageKey="us_auth_v1"
      password="you-and-me"
      title={t.gateTitle}
      subtitle={t.gateSub}
      decoration={GATE_MOSAIC}
    >
      <UsView />
    </PageGate>
  );
}

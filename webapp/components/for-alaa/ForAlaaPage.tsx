"use client";

import "@/styles/legacy/for-alaa.css";

import LegacyTopnav from "@/components/shared/LegacyTopnav";
import PageGate from "@/components/shared/PageGate";
import { useLanguage } from "@/lib/i18n";

const T = {
  en: {
    headerEyebrow: "A bouquet that never wilts",
    headerTitle: "For my Alaa",
    attr: "Pierre-Joseph Redouté · 1838",
    dedication:
      "For my Alaa — who loves flowers as much as I love her, this bouquet will never wilt.",
    date: "August 25, 2026",
    gateTitle: "For Alaa",
    gateSub: "Made for the woman who loves flowers",
    gateHint: "Hint: your name and what you are to me",
  },
  ar: {
    headerEyebrow: "باقةٌ لا تذبل",
    headerTitle: "لِآلائي",
    attr: "بيير جوزيف ردوتيه · ١٨٣٨",
    dedication:
      "لِآلائي — التي تُحبّ الزهور بقدر ما أحبّها، هذه الباقة لا تذبل أبداً.",
    date: "٢٥ أغسطس ٢٠٢٦",
    gateTitle: "لـ آلاء",
    gateSub: "مُصنوع للتي تحبّ الزهور",
    gateHint: "تلميح: اسمكِ وما تكونينه لي",
  },
} as const;

const ROSE_DECORATION = (
  <div className="gate-rose" aria-hidden="true">
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gateRoseGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFEEF3" />
          <stop offset="55%" stopColor="#F48FB1" />
          <stop offset="100%" stopColor="#C2185B" />
        </radialGradient>
      </defs>
      <g transform="translate(32 32)">
        <g fill="url(#gateRoseGrad)">
          <path d="M 0 0 C -10 -4 -14 -16 -6 -22 C 0 -25 6 -22 6 -16 C 6 -10 0 -8 0 0 Z" />
          <path
            d="M 0 0 C -10 -4 -14 -16 -6 -22 C 0 -25 6 -22 6 -16 C 6 -10 0 -8 0 0 Z"
            transform="rotate(72)"
          />
          <path
            d="M 0 0 C -10 -4 -14 -16 -6 -22 C 0 -25 6 -22 6 -16 C 6 -10 0 -8 0 0 Z"
            transform="rotate(144)"
          />
          <path
            d="M 0 0 C -10 -4 -14 -16 -6 -22 C 0 -25 6 -22 6 -16 C 6 -10 0 -8 0 0 Z"
            transform="rotate(216)"
          />
          <path
            d="M 0 0 C -10 -4 -14 -16 -6 -22 C 0 -25 6 -22 6 -16 C 6 -10 0 -8 0 0 Z"
            transform="rotate(288)"
          />
        </g>
        <circle cx="0" cy="0" r="3" fill="#88143E" />
      </g>
    </svg>
  </div>
);

function ForAlaaView() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <>
      <LegacyTopnav />
      <div className="page">
        <div className="header-block">
          <div className="header-eyebrow">{t.headerEyebrow}</div>
          <h1 className="header-title">{t.headerTitle}</h1>
        </div>

        <div className="bouquet-stage">
          <div className="bouquet-halo" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bouquet-img"
            src="/img/redoute-pink-roses.jpg"
            alt="A bouquet of pink roses in a vase — watercolor on paper, attributed to Pierre-Joseph Redouté, 1838"
            loading="eager"
            decoding="async"
          />
          <div className="bouquet-attr">{t.attr}</div>
        </div>

        <p className="dedication">{t.dedication}</p>

        <div className="ornament">
          <div className="ornament-line" />
          <div className="ornament-diamond" />
          <div className="ornament-line" />
        </div>

        <div className="page-foot">
          <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp;
          <span>{t.date}</span>
        </div>
      </div>
    </>
  );
}

export default function ForAlaaPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <PageGate
      storageKey="alaa_auth_v1"
      password="alaa-core"
      title={t.gateTitle}
      subtitle={t.gateSub}
      decoration={ROSE_DECORATION}
    >
      <ForAlaaView />
    </PageGate>
  );
}

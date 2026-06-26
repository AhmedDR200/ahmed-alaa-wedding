"use client";

import "@/styles/legacy/for-alaa.css";

import LegacyTopnav from "@/components/shared/LegacyTopnav";
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
  return <ForAlaaView />;
}

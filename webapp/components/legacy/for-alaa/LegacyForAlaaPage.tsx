"use client";

import { useLayoutEffect, useRef } from "react";
import "@/styles/legacy/for-alaa.css";
import { runForAlaaScripts } from "@/lib/legacy/for-alaa";

const BODY_HTML = `

<!-- ══ PASSWORD GATE ══ -->
<div id="gate">
  <div class="gate-inner">
    <div class="gate-mono">A &amp; A</div>
    <div class="gate-title t" data-en="For Alaa" data-ar="لـ آلاء">For Alaa</div>
    <div class="gate-sub t" data-en="Made for the woman who loves flowers" data-ar="مُصنوع للتي تحبّ الزهور">Made for the woman who loves flowers</div>

    <div class="gate-rose" aria-hidden="true">
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gateRoseGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stop-color="#FFEEF3"/>
            <stop offset="55%" stop-color="#F48FB1"/>
            <stop offset="100%" stop-color="#C2185B"/>
          </radialGradient>
        </defs>
        <g transform="translate(32 32)">
          <g fill="url(#gateRoseGrad)">
            <path d="M 0 0 C -10 -4 -14 -16 -6 -22 C 0 -25 6 -22 6 -16 C 6 -10 0 -8 0 0 Z"/>
            <path d="M 0 0 C -10 -4 -14 -16 -6 -22 C 0 -25 6 -22 6 -16 C 6 -10 0 -8 0 0 Z" transform="rotate(72)"/>
            <path d="M 0 0 C -10 -4 -14 -16 -6 -22 C 0 -25 6 -22 6 -16 C 6 -10 0 -8 0 0 Z" transform="rotate(144)"/>
            <path d="M 0 0 C -10 -4 -14 -16 -6 -22 C 0 -25 6 -22 6 -16 C 6 -10 0 -8 0 0 Z" transform="rotate(216)"/>
            <path d="M 0 0 C -10 -4 -14 -16 -6 -22 C 0 -25 6 -22 6 -16 C 6 -10 0 -8 0 0 Z" transform="rotate(288)"/>
          </g>
          <circle cx="0" cy="0" r="3" fill="#88143E"/>
        </g>
      </svg>
    </div>

    <div class="gate-field" id="gate-field">
      <input type="password" id="gate-input" placeholder="Enter your secret" autocomplete="off" />
      <button onclick="checkPass()" aria-label="Enter">→</button>
    </div>
    <div class="gate-error" id="gate-error"></div>
    <div class="gate-hint t" data-en="Hint: your name and what you are to me" data-ar="تلميح: اسمكِ وما تكونينه لي">Hint: your name and what you are to me</div>
  </div>
</div>

<!-- ══ TOP NAV ══ -->
<nav class="topnav">
  <a class="topnav-mono" href="/">A &amp; A</a>
  <div class="topnav-links">
    <a href="/"     class="topnav-link"        data-page="home"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"/></svg></span><span class="t" data-en="Home" data-ar="الرئيسية">Home</span></a>
    <a href="/flame"     class="topnav-link"        data-page="flame"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10.94c2.33-3.31.17-7.82-1-8.94 0 3.4-2.24 5.3-3.67 6.7C5.9 10.11 5 12 5 14.29 5 18 8.13 21 12 21s7-3 7-6.71c0-1.71-1.23-4.4-2.33-5.59-2.09 3.36-3.26 3.36-4.67 2.24Z"/></svg></span><span class="t" data-en="Flame" data-ar="الشعلة">Flame</span></a>
    <a href="/our-song"  class="topnav-link"        data-page="song"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13M9 9l12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span><span class="t" data-en="Song" data-ar="الأغنية">Song</span></a>
    <a href="/memes"     class="topnav-link"        data-page="memes"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span><span class="t" data-en="Memes" data-ar="ميمز">Memes</span></a>
    <a href="/us"        class="topnav-link"        data-page="us"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="16" height="16" rx="2"/><circle cx="12" cy="8" r="2"/><path d="m22 13-1.3-1.3a2.4 2.4 0 0 0-3.4 0L11 18"/><path d="M18 22H4a2 2 0 0 1-2-2V6"/></svg></span><span class="t" data-en="Us" data-ar="نحن">Us</span></a>
    <a href="/secrets"   class="topnav-link"        data-page="secrets"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span><span class="t" data-en="Secrets" data-ar="أسرار">Secrets</span></a>
    <a href="/for-alaa"  class="topnav-link active" data-page="alaa"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10h-1a4 4 0 1 1 4-4v.534"/><path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/><path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/><path d="M9.77 12C4 15 2 22 2 22"/><circle cx="17" cy="8" r="2"/></svg></span><span class="t" data-en="For Alaa" data-ar="لـ آلاء">For Alaa</span></a>
  </div>
  <button class="topnav-lang" onclick="toggleLang()">عربي</button>
</nav>

<!-- ══ PAGE ══ -->
<div class="page">

  <div class="header-block">
    <div class="header-eyebrow t" data-en="A bouquet that never wilts" data-ar="باقةٌ لا تذبل">A bouquet that never wilts</div>
    <h1 class="header-title t" data-en="For my Alaa" data-ar="لِآلائي">For my Alaa</h1>
  </div>

  <!-- ══ BOUQUET (museum-quality watercolor by Pierre-Joseph Redouté, 1838) ══ -->
  <div class="bouquet-stage">
    <div class="bouquet-halo" aria-hidden="true"></div>
    <img class="bouquet-img"
         src="/img/redoute-pink-roses.jpg"
         alt="A bouquet of pink roses in a vase — watercolor on paper, attributed to Pierre-Joseph Redouté, 1838"
         loading="eager"
         decoding="async" />
    <div class="bouquet-attr t"
         data-en="Pierre-Joseph Redouté · 1838"
         data-ar="بيير جوزيف ردوتيه · ١٨٣٨">Pierre-Joseph Redouté · 1838</div>
  </div>

  <p class="dedication t"
     data-en="For my Alaa &mdash; who loves flowers as much as I love her, this bouquet will never wilt."
     data-ar="لِآلائي &mdash; التي تُحبّ الزهور بقدر ما أحبّها، هذه الباقة لا تذبل أبداً.">
    For my Alaa — who loves flowers as much as I love her, this bouquet will never wilt.
  </p>

  <div class="ornament">
    <div class="ornament-line"></div>
    <div class="ornament-diamond"></div>
    <div class="ornament-line"></div>
  </div>

  <div class="page-foot">
    <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp;
    <span class="t" data-en="August 25, 2026" data-ar="٢٥ أغسطس ٢٠٢٦">August 25, 2026</span>
  </div>

</div>


`;

export default function LegacyForAlaaPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useLayoutEffect(() => {
    if (ranRef.current || !rootRef.current) return;
    ranRef.current = true;
    runForAlaaScripts(rootRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className="legacy-page legacy-for-alaa"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
      suppressHydrationWarning
    />
  );
}

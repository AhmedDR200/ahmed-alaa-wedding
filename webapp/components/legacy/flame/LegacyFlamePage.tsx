"use client";

import { useLayoutEffect, useRef } from "react";
import "@/styles/legacy/flame.css";
import { runFlameScripts } from "@/lib/legacy/flame";

const BODY_HTML = `

<!-- ══ PASSWORD GATE ══ -->
<div id="gate">
  <div class="gate-inner">
    <div class="gate-mono">A &amp; A</div>
    <div class="gate-title">Our Daily Flame</div>
    <div class="gate-sub">This space is just for us</div>
    <div class="gate-flame">
      <div class="gf gf1"></div>
      <div class="gf gf2"></div>
      <div class="gf gf3"></div>
    </div>
    <div class="gate-field" id="gate-field">
      <input type="password" id="gate-input" placeholder="Enter your secret" autocomplete="off" />
      <button onclick="checkPass()">→</button>
    </div>
    <div class="gate-error" id="gate-error"></div>
  </div>
</div>

<!-- ══ TOP NAV ══ -->
<nav class="topnav">
  <a class="topnav-mono" href="/">A &amp; A</a>
  <div class="topnav-links">
    <a href="/"     class="topnav-link"        data-page="home"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"/></svg></span><span class="t" data-en="Home" data-ar="الرئيسية">Home</span></a>
    <a href="/flame"     class="topnav-link active" data-page="flame"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10.94c2.33-3.31.17-7.82-1-8.94 0 3.4-2.24 5.3-3.67 6.7C5.9 10.11 5 12 5 14.29 5 18 8.13 21 12 21s7-3 7-6.71c0-1.71-1.23-4.4-2.33-5.59-2.09 3.36-3.26 3.36-4.67 2.24Z"/></svg></span><span class="t" data-en="Flame" data-ar="الشعلة">Flame</span></a>
    <a href="/our-song"  class="topnav-link"        data-page="song"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13M9 9l12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span><span class="t" data-en="Song" data-ar="الأغنية">Song</span></a>
    <a href="/memes"     class="topnav-link"        data-page="memes"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span><span class="t" data-en="Memes" data-ar="ميمز">Memes</span></a>
    <a href="/us"        class="topnav-link"        data-page="us"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="16" height="16" rx="2"/><circle cx="12" cy="8" r="2"/><path d="m22 13-1.3-1.3a2.4 2.4 0 0 0-3.4 0L11 18"/><path d="M18 22H4a2 2 0 0 1-2-2V6"/></svg></span><span class="t" data-en="Us" data-ar="نحن">Us</span></a>
    <a href="/secrets"   class="topnav-link"        data-page="secrets"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span><span class="t" data-en="Secrets" data-ar="أسرار">Secrets</span></a>
    <a href="/for-alaa"  class="topnav-link"        data-page="alaa"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10h-1a4 4 0 1 1 4-4v.534"/><path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/><path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/><path d="M9.77 12C4 15 2 22 2 22"/><circle cx="17" cy="8" r="2"/></svg></span><span class="t" data-en="For Alaa" data-ar="لـ آلاء">For Alaa</span></a>
  </div>
  <button class="topnav-lang" onclick="toggleLang()">عربي</button>
</nav>

<div class="page">

  <!-- STREAK -->
  <div class="streak-header">
    <div class="streak-num" id="streak-num">0</div>
    <div class="streak-label t" data-en="Day Streak" data-ar="أيام متتالية">Day Streak</div>
    <div class="streak-best" id="streak-best"></div>
  </div>

  <!-- FLAME -->
  <div class="flame-wrap dim" id="flame-wrap">
    <div class="flame-glow"></div>
    <svg class="flame-svg" viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="bigFlameOuter" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%"   stop-color="#7A5A28"/>
          <stop offset="35%"  stop-color="#B8975A"/>
          <stop offset="75%"  stop-color="#D4B483"/>
          <stop offset="100%" stop-color="#EEE0C4"/>
        </linearGradient>
        <linearGradient id="bigFlameInner" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%"   stop-color="#D4B483" stop-opacity="0"/>
          <stop offset="55%"  stop-color="#EEE0C4" stop-opacity=".75"/>
          <stop offset="100%" stop-color="#FFF6DC"/>
        </linearGradient>
        <radialGradient id="bigFlameCore" cx="50%" cy="70%" r="55%">
          <stop offset="0%"   stop-color="#FFFBE8"/>
          <stop offset="60%"  stop-color="#F4E0A8" stop-opacity=".9"/>
          <stop offset="100%" stop-color="#D4B483" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Outer flame silhouette -->
      <path d="M50 178
               C 18 178, 5 150, 8 110
               C 12 80, 30 70, 32 80
               C 34 92, 42 88, 40 78
               C 36 60, 30 40, 50 4
               C 60 28, 80 50, 85 100
               C 90 145, 78 178, 50 178 Z"
            fill="url(#bigFlameOuter)"/>
      <!-- Inner flame -->
      <path d="M50 165
               C 28 165, 22 138, 26 108
               C 30 90, 42 84, 42 92
               C 42 100, 50 96, 50 90
               C 50 78, 46 64, 52 46
               C 60 65, 76 88, 76 118
               C 76 145, 65 165, 50 165 Z"
            fill="url(#bigFlameInner)" opacity=".9"/>
      <!-- Bright animated core -->
      <ellipse class="flame-core" cx="50" cy="135" rx="18" ry="28" fill="url(#bigFlameCore)"/>
    </svg>
    <div class="wick"></div>
  </div>

  <!-- MESSAGE -->
  <div class="flame-message" id="flame-msg">Keep the flame alive today</div>

  <!-- HEARTS -->
  <div class="status-row">
    <button class="heart-btn" id="btn-ahmed" onclick="tap('ahmed', event)">
      <div class="heart-icon" id="heart-ahmed">♡</div>
      <div class="heart-name">Ahmed</div>
      <div class="heart-status-text t" id="status-ahmed" data-en="Tap to connect" data-ar="اضغط للتواصل">Tap to connect</div>
    </button>

    <div class="status-divider"></div>

    <button class="heart-btn" id="btn-alaa" onclick="tap('alaa', event)">
      <div class="heart-icon" id="heart-alaa">♡</div>
      <div class="heart-name">Alaa</div>
      <div class="heart-status-text t" id="status-alaa" data-en="Tap to connect" data-ar="اضغط للتواصل">Tap to connect</div>
    </button>
  </div>

  <!-- ORNAMENT -->
  <div class="ornament">
    <div class="ornament-line"></div>
    <div class="ornament-diamond"></div>
    <div class="ornament-line"></div>
  </div>

  <!-- HISTORY -->
  <div class="history-wrap">
    <div class="history-label t" data-en="Last 30 Days" data-ar="آخر ٣٠ يوماً">Last 30 Days</div>
    <div class="history-dots" id="history-dots"></div>
  </div>

  <!-- STATS -->
  <div class="stats-footer">
    <div class="sf-item">
      <div class="sf-num" id="stat-best">0</div>
      <div class="sf-label t" data-en="Best Streak" data-ar="أطول سلسلة">Best Streak</div>
    </div>
    <div class="sf-item">
      <div class="sf-num" id="stat-total">0</div>
      <div class="sf-label t" data-en="Days Together" data-ar="أيام معاً">Days Together</div>
    </div>
    <div class="sf-item">
      <div class="sf-num" id="stat-missed">0</div>
      <div class="sf-label t" data-en="Days Missed" data-ar="أيام فائتة">Days Missed</div>
    </div>
  </div>

</div>


`;

export default function LegacyFlamePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useLayoutEffect(() => {
    if (ranRef.current || !rootRef.current) return;
    ranRef.current = true;
    runFlameScripts(rootRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className="legacy-page legacy-flame"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
      suppressHydrationWarning
    />
  );
}

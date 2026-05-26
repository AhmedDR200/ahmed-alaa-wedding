"use client";

import { useEffect, useRef } from "react";
import "@/styles/legacy/invite.css";
import { runInviteScripts } from "@/lib/legacy/invite";

const BODY_HTML = `

<!-- ═══ LOADER ═══ -->
<div id="loader">
  <div class="loader-inner">
    <div class="loader-ring">A &amp; A</div>
    <div class="loader-date">August 25 · 2026</div>
  </div>
</div>

<!-- ═══ BACKDROP ═══ -->
<div class="bg-photo" aria-hidden="true"></div>
<div class="bg-veil"  aria-hidden="true"></div>
<div class="grain"    aria-hidden="true"></div>

<!-- ═══ TOP BAR ═══ -->
<header class="topbar">
  <a class="brand" href="/" aria-label="A &amp; A">A &amp; A</a>
  <button class="lang-btn" id="lang-btn" onclick="toggleLang()">عربي</button>
</header>

<!-- ═══ MAIN ═══ -->
<main class="invite-wrap">

  <!-- ─ Invite Card ─ -->
  <article class="card reveal">
    <span class="corner tl"></span>
    <span class="corner tr"></span>
    <span class="corner bl"></span>
    <span class="corner br"></span>

    <div class="bismillah" lang="ar" dir="rtl" aria-label="Quran Ar-Rum 21">
      وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَة
    </div>
    <span class="ayah-cite">Ar-Rum · 21</span>

    <div class="eyebrow t" data-en="Together with their families" data-ar="بصُحبة عائلتيهما">Together with their families</div>

    <div class="portrait-frame" id="portrait" onclick="flipPortrait()" role="button" tabindex="0" aria-label="Tap to flip — then and now">
      <div class="portrait-inner">
        <div class="portrait-face front">
          <img src="/img/kids.png" alt="Ahmed and Alaa as children" loading="eager" />
        </div>
        <div class="portrait-face back">
          <img src="/img/now.jpg" alt="Ahmed and Alaa today" loading="eager" />
        </div>
      </div>
    </div>
    <div class="flip-hint">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>
      <span class="t" data-en="Tap the photo · Then &amp; Now" data-ar="اضغط على الصورة · زمان والآن">Tap the photo · Then &amp; Now</span>
    </div>

    <div class="dear t" id="dear-line" data-en="" data-ar=""></div>

    <h1 class="names" id="names">
      Ahmed <em class="amp">&amp;</em> Alaa
    </h1>

    <p class="invite-line t"
       data-en="request the honour of your presence at the celebration of their wedding"
       data-ar="يتشرّفان بدعوتكم لمشاركتهما فرحة العمر">
      request the honour of your presence at the celebration of their wedding
    </p>

    <div class="ornament">
      <span class="orn-line"></span>
      <span class="orn-diamond"></span>
      <span class="orn-line"></span>
    </div>

    <div class="date-block">
      <div class="weekday t" data-en="Tuesday" data-ar="الثلاثاء">Tuesday</div>
      <div class="date-main">
        <span class="d-month t" data-en="August" data-ar="أغسطس">August</span>
        <span class="d-day">25</span>
        <span class="d-year">2026</span>
      </div>
      <div class="time t" data-en="6:00 PM" data-ar="٦:٠٠ مساءً">6:00 PM</div>
    </div>

    <div class="venue">
      <div class="venue-name t" data-en="Marly Hall" data-ar="قاعة مارلي">Marly Hall</div>
      <div class="venue-addr t" data-en="Armed Forces Club · Ras El Bar · Damietta" data-ar="نادي القوات المسلحة · رأس البر · دمياط">Armed Forces Club · Ras El Bar · Damietta</div>
    </div>

    <div class="cta-row">
      <a class="btn" id="cal-btn" href="#" download="ahmed-and-alaa.ics">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8"  y1="2" x2="8"  y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span class="t" data-en="Add to Calendar" data-ar="أضِف للتقويم">Add to Calendar</span>
      </a>
      <a class="btn btn-ghost" id="map-btn" href="https://maps.app.goo.gl/nd7HixpkUrvGGNts7" target="_blank" rel="noreferrer noopener">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span class="t" data-en="Open in Maps" data-ar="افتح الخريطة">Open in Maps</span>
      </a>
    </div>
  </article>

  <!-- ─ Countdown ─ -->
  <section class="countdown reveal" id="countdown">
    <div class="cd-eyebrow t" data-en="Until We Say I Do" data-ar="حتى يحين موعد الزفاف">Until We Say I Do</div>
    <div class="cd-row" id="cd-row">
      <div class="cd-unit">
        <div class="cd-num" id="cd-days">--</div>
        <div class="cd-bar"></div>
        <div class="cd-label t" data-en="Days" data-ar="أيام">Days</div>
      </div>
      <div class="cd-sep">·</div>
      <div class="cd-unit">
        <div class="cd-num" id="cd-hours">--</div>
        <div class="cd-bar"></div>
        <div class="cd-label t" data-en="Hours" data-ar="ساعات">Hours</div>
      </div>
      <div class="cd-sep">·</div>
      <div class="cd-unit">
        <div class="cd-num" id="cd-mins">--</div>
        <div class="cd-bar"></div>
        <div class="cd-label t" data-en="Minutes" data-ar="دقائق">Minutes</div>
      </div>
      <div class="cd-sep">·</div>
      <div class="cd-unit">
        <div class="cd-num" id="cd-secs">--</div>
        <div class="cd-bar"></div>
        <div class="cd-label t" data-en="Seconds" data-ar="ثواني">Seconds</div>
      </div>
    </div>
  </section>

  <p class="closing t"
     data-en="Your presence is the greatest gift of all."
     data-ar="حضوركم أغلى هدية.">
    Your presence is the greatest gift of all.
  </p>
</main>

<!-- ═══ FOOTER ═══ -->
<footer>
  <div class="foot-orn">
    <span class="orn-line"></span>
    <span class="orn-diamond"></span>
    <span class="orn-line"></span>
  </div>
  <div class="foot-main"><strong>Ahmed &amp; Alaa</strong> · August 25, 2026</div>
  <div class="foot-sub t" data-en="Made with love" data-ar="صُنع بحب">Made with love</div>
  <a class="foot-link" href="/" id="foot-link" aria-label="hidden">·</a>
</footer>

<canvas id="confetti" aria-hidden="true"></canvas>


`;

export default function LegacyInvitePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current || !rootRef.current) return;
    ranRef.current = true;
    runInviteScripts(rootRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className="legacy-page legacy-invite"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
      suppressHydrationWarning
    />
  );
}

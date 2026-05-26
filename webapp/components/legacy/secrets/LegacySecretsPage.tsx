"use client";

import { useLayoutEffect, useRef } from "react";
import "@/styles/legacy/secrets.css";
import { runSecretsScripts } from "@/lib/legacy/secrets";

const BODY_HTML = `

<!-- ══ PASSWORD GATE ══ -->
<div id="gate">
  <div class="gate-inner">
    <div class="gate-mono">A &amp; A</div>
    <div class="gate-title t" data-en="Secrets" data-ar="أسرار">Secrets</div>
    <div class="gate-sub t" data-en="Sealed for the other to open" data-ar="مختومةٌ ليفتحها الآخر">Sealed for the other to open</div>

    <div class="gate-seal" aria-hidden="true">
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="waxGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%"  stop-color="#E27358"/>
            <stop offset="55%" stop-color="#C8553D"/>
            <stop offset="100%" stop-color="#7A2A1C"/>
          </radialGradient>
        </defs>
        <!-- envelope body -->
        <rect x="6" y="16" width="52" height="36" rx="3" fill="none" stroke="#B8975A" stroke-width="1.5"/>
        <!-- envelope flap -->
        <path d="M6 19 L32 38 L58 19" fill="none" stroke="#B8975A" stroke-width="1.5"/>
        <!-- wax seal -->
        <circle cx="32" cy="38" r="9" fill="url(#waxGrad)" stroke="#3A1208" stroke-width="0.8"/>
        <text x="32" y="42" text-anchor="middle"
              font-family="Cormorant Garamond, serif" font-style="italic"
              font-size="10" fill="#FFE9DC">A</text>
      </svg>
    </div>

    <div class="gate-field" id="gate-field">
      <input type="password" id="gate-input" placeholder="Enter your secret" autocomplete="off" />
      <button onclick="checkPass()" aria-label="Enter">→</button>
    </div>
    <div class="gate-error" id="gate-error"></div>
    <div class="gate-hint t" data-en="Hint: just between us" data-ar="تلميح: فقط بيننا">Hint: just between us</div>
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
    <a href="/secrets"   class="topnav-link active" data-page="secrets"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span><span class="t" data-en="Secrets" data-ar="أسرار">Secrets</span></a>
    <a href="/for-alaa"  class="topnav-link"        data-page="alaa"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10h-1a4 4 0 1 1 4-4v.534"/><path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/><path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/><path d="M9.77 12C4 15 2 22 2 22"/><circle cx="17" cy="8" r="2"/></svg></span><span class="t" data-en="For Alaa" data-ar="لـ آلاء">For Alaa</span></a>
  </div>
  <button class="topnav-lang" onclick="toggleLang()">عربي</button>
</nav>

<!-- ══ IDENTITY PICKER ══ -->
<div id="idpick" aria-hidden="true">
  <div class="idpick-card">
    <div class="idpick-eyebrow t" data-en="Just so we know" data-ar="فقط لِنَعرف">Just so we know</div>
    <div class="idpick-title t" data-en="Who's reading?" data-ar="مَن يقرأ؟">Who's reading?</div>
    <div class="idpick-sub t" data-en="We ask every visit — to be sure" data-ar="نسأل في كل زيارة — للتأكّد">We ask every visit — to be sure</div>
    <div class="idpick-buttons">
      <button class="idpick-btn t" data-who="ahmed" data-en="Ahmed" data-ar="أحمد">Ahmed</button>
      <button class="idpick-btn t" data-who="alaa"  data-en="Alaa"  data-ar="آلاء">Alaa</button>
    </div>
  </div>
</div>

<!-- ══ PAGE ══ -->
<div class="page">

  <div class="header-block">
    <div class="header-eyebrow t" data-en="Sealed envelopes between us" data-ar="مظاريف مختومة بيننا">Sealed envelopes between us</div>
    <h1 class="header-title t" data-en="Secrets" data-ar="أسرار">Secrets</h1>
    <div class="header-me">
      <span class="t" data-en="You are" data-ar="أنتَ/أنتِ">You are</span>
      <strong id="me-name">—</strong>
      <a id="switch-me" onclick="switchIdentity()"
         data-en-text="switch" data-ar-text="تبديل">switch</a>
    </div>
  </div>

  <!-- ── COMPOSE BOX ── -->
  <section class="compose" aria-label="Write a new secret">
    <textarea id="compose-text"
              maxlength="2000"
              placeholder="Write a secret only she/he should see…"
              data-placeholder-en="Write a secret only she/he should see…"
              data-placeholder-ar="اكتب سرّاً لا يراه إلا هو/هي…"></textarea>

    <div class="compose-photo-preview" id="photo-preview">
      <span class="preview-x" onclick="clearPhoto()" aria-label="Remove photo">✕</span>
      <img id="photo-preview-img" alt="" />
    </div>

    <div class="compose-divider"></div>

    <div class="compose-row">
      <div class="compose-tools">
        <label class="icon-btn" for="photo-input" title="Attach photo" aria-label="Attach photo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="m21 15-5-5L5 21"/>
          </svg>
        </label>
        <input type="file" id="photo-input" accept="image/*" />

        <div class="author-toggle" role="group" aria-label="Author">
          <button id="author-ahmed" type="button" data-who="ahmed">— Ahmed</button>
          <button id="author-alaa"  type="button" data-who="alaa">— Alaa</button>
        </div>
      </div>

      <button class="send-btn" id="send-btn" onclick="postSecret()">
        <span class="t" data-en="Seal &amp; send" data-ar="اختم وأرسل">Seal &amp; send</span>
      </button>
    </div>

    <div class="compose-status" id="compose-status"></div>
  </section>

  <!-- ── FEED ── -->
  <div class="feed" id="feed" aria-live="polite">
    <div class="feed-loading t" data-en="Loading sealed envelopes…" data-ar="جارٍ تحميل المظاريف المختومة…">Loading sealed envelopes…</div>
  </div>

  <div class="ornament">
    <div class="ornament-line"></div>
    <div class="ornament-diamond"></div>
    <div class="ornament-line"></div>
  </div>

  <div class="page-foot">
    <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp;
    <span class="t" data-en="Just between us" data-ar="فقط بيننا">Just between us</span>
  </div>

</div>

<!-- ══ LIGHTBOX ══ -->
<div id="lightbox" onclick="closeLightbox()" aria-hidden="true">
  <img id="lightbox-img" alt="" />
</div>

<!-- ══ TOAST ══ -->
<div class="toast" id="toast" aria-live="polite"></div>


`;

export default function LegacySecretsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useLayoutEffect(() => {
    if (ranRef.current || !rootRef.current) return;
    ranRef.current = true;
    runSecretsScripts(rootRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className="legacy-page legacy-secrets"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
      suppressHydrationWarning
    />
  );
}

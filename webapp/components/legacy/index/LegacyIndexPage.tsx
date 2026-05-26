"use client";

import { useLayoutEffect, useRef } from "react";
import "@/styles/legacy/index.css";
import { runIndexScripts } from "@/lib/legacy/index";

const BODY_HTML = `

<!-- ══ SCROLL PROGRESS BAR ══ -->
<div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>



<!-- ══ PASSWORD GATE (home) ══ -->
<div id="gate">
  <div class="gate-inner">
    <div class="gate-mono">A &amp; A</div>
    <div class="gate-title t" data-en="Ahmed &amp; Alaa" data-ar="أحمد وآلاء">Ahmed &amp; Alaa</div>
    <div class="gate-sub t" data-en="For us only" data-ar="لنا وحدنا">For us only</div>
    <div class="gate-diamond" aria-hidden="true"></div>
    <div class="gate-field" id="gate-field">
      <input type="password" id="gate-input" placeholder="Enter your secret" data-en-ph="Enter your secret" data-ar-ph="السرّ بيننا" autocomplete="off" />
      <button type="button" onclick="checkHomePass()" aria-label="Enter">→</button>
    </div>
    <div class="gate-error" id="gate-error"></div>
    <div class="gate-hint t" data-en="Same phrase as the “For Alaa” page (your name + what you are to me)." data-ar="نفس عبارة صفحة «لـ آلاء» (اسمكِ وما تكونينه لي).">Same phrase as the “For Alaa” page (your name + what you are to me).</div>
    <button type="button" class="gate-lang" id="gate-lang-btn" onclick="toggleGateLang()">عربي</button>
  </div>
</div>


<!-- ══ LOADER ══ -->
<div id="loader">
  <div class="loader-inner">
    <div class="loader-ring">A &amp; A</div>
    <div class="loader-divider">
      <div class="loader-line"></div>
      <div class="loader-diamond"></div>
      <div class="loader-line"></div>
    </div>
    <div class="loader-name">Ahmed &amp; Alaa</div>
  </div>
</div>

<!-- ══ CUSTOM CURSOR ══ -->
<div class="cursor-dot"  id="cur-dot"></div>
<div class="cursor-ring" id="cur-ring"></div>

<!-- ══ TOP NAV ══ -->
<nav class="topnav">
  <a class="topnav-mono" href="/">A &amp; A</a>
  <div class="topnav-links">
    <a href="/"     class="topnav-link active" data-page="home"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"/></svg></span><span class="t" data-en="Home" data-ar="الرئيسية">Home</span></a>
    <a href="/flame"     class="topnav-link"        data-page="flame"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10.94c2.33-3.31.17-7.82-1-8.94 0 3.4-2.24 5.3-3.67 6.7C5.9 10.11 5 12 5 14.29 5 18 8.13 21 12 21s7-3 7-6.71c0-1.71-1.23-4.4-2.33-5.59-2.09 3.36-3.26 3.36-4.67 2.24Z"/></svg></span><span class="t" data-en="Flame" data-ar="الشعلة">Flame</span></a>
    <a href="/our-song"  class="topnav-link"        data-page="song"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13M9 9l12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span><span class="t" data-en="Song" data-ar="الأغنية">Song</span></a>
    <a href="/memes"     class="topnav-link"        data-page="memes"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span><span class="t" data-en="Memes" data-ar="ميمز">Memes</span></a>
    <a href="/us"        class="topnav-link"        data-page="us"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="16" height="16" rx="2"/><circle cx="12" cy="8" r="2"/><path d="m22 13-1.3-1.3a2.4 2.4 0 0 0-3.4 0L11 18"/><path d="M18 22H4a2 2 0 0 1-2-2V6"/></svg></span><span class="t" data-en="Us" data-ar="نحن">Us</span></a>
    <a href="/secrets"   class="topnav-link"        data-page="secrets"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span><span class="t" data-en="Secrets" data-ar="أسرار">Secrets</span></a>
    <a href="/for-alaa"  class="topnav-link"        data-page="alaa"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10h-1a4 4 0 1 1 4-4v.534"/><path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/><path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/><path d="M9.77 12C4 15 2 22 2 22"/><circle cx="17" cy="8" r="2"/></svg></span><span class="t" data-en="For Alaa" data-ar="لـ آلاء">For Alaa</span></a>
  </div>
  <button class="topnav-lang" id="lang-btn" onclick="toggleLang()">عربي</button>
</nav>

<!-- ══ MILESTONE BANNER ══ -->
<div class="milestone-banner" id="milestone-banner">
  <span class="milestone-text" id="milestone-text"></span>
  <button class="milestone-close" onclick="closeMilestone()">✕</button>
</div>

<!-- ══ CANVAS LAYERS ══ -->
<canvas id="petals-canvas"></canvas>
<canvas id="confetti-canvas"></canvas>

<!-- ══ HERO ══ -->
<section class="hero">
  <div class="hero-bg" id="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="monogram">
      <div class="monogram-line"></div>
      <div class="monogram-circle" id="monogram-circle">A &amp; A</div>
      <div class="monogram-line"></div>
    </div>
    <div class="hero-names" id="hero-names">
      Ahmed
      <em>&amp;</em>
      Alaa
    </div>
    <div class="hero-date-line">
      <span class="t" data-en="Tuesday · August 25 · 2026" data-ar="الثلاثاء · ٢٥ أغسطس · ٢٠٢٦">Tuesday · August 25 · 2026</span>
    </div>
  </div>
  <div class="scroll-cue">
    <span class="t" data-en="Scroll" data-ar="للأسفل">Scroll</span>
    <div class="scroll-arrow"></div>
  </div>
</section>

<!-- ══ COUNTDOWN ══ -->
<div class="countdown-section reveal" id="countdown-section">
  <div class="section-eyebrow t" data-en="Until We Say I Do" data-ar="حتى يحين موعد الزفاف">Until We Say I Do</div>
  <div class="countdown-row reveal reveal-stagger" id="countdown-row">
    <div class="count-unit">
      <div class="count-num" id="cd-days">--</div>
      <div class="count-bar"></div>
      <div class="count-label t" data-en="Days" data-ar="أيام">Days</div>
    </div>
    <div class="count-sep">·</div>
    <div class="count-unit">
      <div class="count-num" id="cd-hours">--</div>
      <div class="count-bar"></div>
      <div class="count-label t" data-en="Hours" data-ar="ساعات">Hours</div>
    </div>
    <div class="count-sep">·</div>
    <div class="count-unit">
      <div class="count-num" id="cd-mins">--</div>
      <div class="count-bar"></div>
      <div class="count-label t" data-en="Minutes" data-ar="دقائق">Minutes</div>
    </div>
    <div class="count-sep">·</div>
    <div class="count-unit">
      <div class="count-num" id="cd-secs">--</div>
      <div class="count-bar"></div>
      <div class="count-label t" data-en="Seconds" data-ar="ثواني">Seconds</div>
    </div>
  </div>
</div>

<!-- ══ STATS ══ -->
<div class="stats-section reveal">
  <div class="ornament" style="margin-bottom:40px;">
    <div class="ornament-line"></div>
    <div class="ornament-diamond"></div>
    <div class="ornament-line"></div>
  </div>
  <div class="stats-row reveal reveal-stagger">
    <div class="stat-item">
      <div class="stat-num" id="stat-weekends">--</div>
      <div class="stat-label t" data-en="Weekends Left" data-ar="عطلة نهاية أسبوع">Weekends Left</div>
    </div>
    <div class="stat-item">
      <div class="stat-num" id="stat-sleeps">--</div>
      <div class="stat-label t" data-en="Sleeps to Go" data-ar="ليلة متبقية">Sleeps to Go</div>
    </div>
    <div class="stat-item">
      <div class="stat-num" id="stat-fridays">--</div>
      <div class="stat-label t" data-en="Fridays to Plan" data-ar="جمعة للتخطيط">Fridays to Plan</div>
    </div>
  </div>
  <div class="ornament" style="margin-top:40px;">
    <div class="ornament-line"></div>
    <div class="ornament-diamond"></div>
    <div class="ornament-line"></div>
  </div>
</div>

<!-- ══ STREAK ══ -->
<div class="streak-section">
  <div class="section-wrap reveal">
    <div class="section-heading" id="heading-streak">Your <em>Journey</em></div>
    <div class="section-sub t"
      data-en="Each day we open this page, a tile lights up — Dec 9, 2025 → Aug 25, 2026"
      data-ar="كل يوم نفتح هذه الصفحة، تضيء لوحة — ٩ ديسمبر ٢٠٢٥ ← ٢٥ أغسطس ٢٠٢٦">Each day we open this page, a tile lights up — Dec 9, 2025 → Aug 25, 2026</div>

    <div class="streak-stats reveal reveal-stagger">
      <div class="streak-stat">
        <div class="streak-stat-num"><span class="streak-fire">✦</span><span id="streak-current">0</span></div>
        <div class="streak-stat-label t" data-en="Day Streak" data-ar="أيام متتالية">Day Streak</div>
      </div>
      <div class="streak-stat">
        <div class="streak-stat-num" id="streak-longest">0</div>
        <div class="streak-stat-label t" data-en="Best Streak" data-ar="أطول سلسلة">Best Streak</div>
      </div>
      <div class="streak-stat">
        <div class="streak-stat-num" id="streak-total">0</div>
        <div class="streak-stat-label t" data-en="Days here" data-ar="أيام معاً هنا">Days here</div>
      </div>
    </div>

    <div class="streak-scroll" id="streak-scroll">
      <div id="streak-month-row" class="streak-month-row"></div>
      <div class="streak-body">
        <div class="streak-day-labels" id="streak-day-labels"></div>
        <div id="streak-grid" class="streak-body" style="gap:3px;"></div>
      </div>
    </div>

    <div class="streak-legend">
      <span class="legend-label t" data-en="Less" data-ar="أقل">Less</span>
      <div class="legend-tiles">
        <div class="legend-tile s-future"></div>
        <div class="legend-tile s-missed"></div>
        <div class="legend-tile" style="background:rgba(184,151,90,.5);border-radius:2px;"></div>
        <div class="legend-tile s-visited"></div>
        <div class="legend-tile s-today"></div>
      </div>
      <span class="legend-label t" data-en="More" data-ar="أكثر">More</span>
    </div>

    <div class="streak-progress">
      <div class="streak-progress-labels">
        <span>Dec 9 2025</span>
        <span class="streak-progress-pct" id="streak-pct">0%</span>
        <span>Aug 25 2026</span>
      </div>
      <div class="streak-track"><div class="streak-fill" id="streak-fill"></div></div>
    </div>
  </div>
</div>

<!-- ══ QUOTE ══ -->
<div class="quote-section reveal">
  <div class="quote-text t"
    data-en='"In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."'
    data-ar='"في كل أرجاء العالم، لا يوجد قلب مثل قلبك. وفي كل أرجاء العالم، لا يوجد حبٌّ لك مثل حبي."'>
    "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
  </div>
  <div class="quote-attr t" data-en="— Maya Angelou" data-ar="— مايا أنجيلو">— Maya Angelou</div>
</div>

<!-- ══ TIMELINE ══ -->
<div class="section-wrap reveal">
  <div class="section-heading" id="heading-story">Our <em>Story</em></div>
  <div class="section-sub t" data-en="The moments that led us here" data-ar="اللحظات التي قادتنا إلى هنا">The moments that led us here</div>
  <div class="timeline reveal reveal-stagger">
    <div class="tl-item">
      <div class="tl-date-col"><div class="tl-date">March 19<br/>2023</div></div>
      <div class="tl-line-col"><div class="tl-dot"></div><div class="tl-connector"></div></div>
      <div class="tl-body">
        <div class="tl-title t" data-en="We First Met" data-ar="أول لقاء">We First Met</div>
        <div class="tl-desc t"
          data-en="Every great love story has a beginning. Ours was no different — and we wouldn't change a single moment of it."
          data-ar="كل قصة حب عظيمة لها بداية. قصتنا لم تكن مختلفة — ولن نغير منها لحظة واحدة.">
          Every great love story has a beginning. Ours was no different — and we wouldn't change a single moment of it.
        </div>
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-date-col"><div class="tl-date">December 9<br/>2025</div></div>
      <div class="tl-line-col"><div class="tl-dot"></div><div class="tl-connector"></div></div>
      <div class="tl-body">
        <div class="tl-title t" data-en="He Asked, She Said Yes" data-ar="سألها... فقالت نعم">He Asked, She Said Yes</div>
        <div class="tl-desc t"
          data-en="The question that changed everything. Two words that meant the whole world. One year later, we make it forever."
          data-ar="السؤال الذي غيّر كل شيء. كلمتان تعنيان العالم بأسره. وبعد عام، نجعلها إلى الأبد.">
          The question that changed everything. Two words that meant the whole world. One year later, we make it forever.
        </div>
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-date-col"><div class="tl-date">August 25<br/>2026</div></div>
      <div class="tl-line-col"><div class="tl-dot"></div><div class="tl-connector"></div></div>
      <div class="tl-body">
        <div class="tl-title t" data-en="The Wedding Day" data-ar="يوم الزفاف">The Wedding Day</div>
        <div class="tl-desc t"
          data-en="The day we say 'I do' and begin our forever together. We can't wait to celebrate surrounded by the people we love most."
          data-ar="اليوم الذي نقول فيه 'نعم' ونبدأ معاً إلى الأبد. لا نستطيع الانتظار للاحتفال بمن نحبّهم.">
          The day we say "I do" and begin our forever together. We can't wait to celebrate surrounded by the people we love most.
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══ REASONS I LOVE YOU ══ -->
<div class="reasons-section">
  <div class="section-wrap reveal">
    <div class="section-heading" id="heading-reasons" style="color:var(--white);">Reasons I <em>Love You</em></div>
    <div class="section-sub t" style="color:rgba(255,255,255,.4);"
      data-en="For Alaa, from Ahmed — with every piece of me"
      data-ar="لآلاء، من أحمد — بكل ما فيّ">For Alaa, from Ahmed — with every piece of me</div>
    <div class="reasons-grid" id="reasons-grid">

      <div class="reason-item">
        <div class="reason-num">01</div>
        <div class="reason-body">
          <div class="reason-title t"
            data-en="The way you smile"
            data-ar="طريقة ابتسامتكِ">The way you smile</div>
          <div class="reason-desc t"
            data-en="That smile — the one that starts slow, like it's deciding whether the moment deserves it. It always does. And every single time, it takes me completely off guard."
            data-ar="تلك الابتسامة التي تبدأ ببطء، كأنها تقرر إن كانت اللحظة تستحق. وهي دائماً تستحق. وفي كل مرة، تفاجئني تماماً.">That smile — the one that starts slow, like it's deciding whether the moment deserves it. It always does. And every single time, it takes me completely off guard.</div>
        </div>
      </div>

      <div class="reason-item">
        <div class="reason-num">02</div>
        <div class="reason-body">
          <div class="reason-title t"
            data-en="How you make every room warmer"
            data-ar="كيف تجعلين كل مكان أكثر دفئاً">How you make every room warmer</div>
          <div class="reason-desc t"
            data-en="You walk in and something shifts. The air gets lighter. People laugh more. I don't think you even know you do it — that's the most beautiful part."
            data-ar="تدخلين وشيء ما يتغير. الجو يخفّ. الناس يضحكون أكثر. لا أعتقد أنكِ تعلمين بذلك — وهذا أجمل ما فيه.">You walk in and something shifts. The air gets lighter. People laugh more. I don't think you even know you do it — that's the most beautiful part.</div>
        </div>
      </div>

      <div class="reason-item">
        <div class="reason-num">03</div>
        <div class="reason-body">
          <div class="reason-title t"
            data-en="Your heart"
            data-ar="قلبكِ">Your heart</div>
          <div class="reason-desc t"
            data-en="The way you care — deeply, quietly, without asking for anything in return. I've never met anyone who loves the way you do. It changed me."
            data-ar="الطريقة التي تهتمين بها — بعمق وبهدوء، دون أن تطلبي شيئاً في المقابل. لم أقابل أحداً يحب كما تحبين. لقد غيّرتِني.">The way you care — deeply, quietly, without asking for anything in return. I've never met anyone who loves the way you do. It changed me.</div>
        </div>
      </div>

      <div class="reason-item">
        <div class="reason-num">04</div>
        <div class="reason-body">
          <div class="reason-title t"
            data-en="The small things you remember"
            data-ar="التفاصيل الصغيرة التي تتذكرينها">The small things you remember</div>
          <div class="reason-desc t"
            data-en="You remember everything I said once, in passing, that I've already forgotten. And somehow it shows up exactly when I need it. You pay attention in a way no one else does."
            data-ar="تتذكرين كل ما قلته مرة عابرة، وأنا نسيته منذ زمن. وبطريقة ما يظهر في اللحظة التي أحتاجه فيها. تنتبهين بطريقة لا يفعلها أحد غيركِ.">You remember everything I said once, in passing, that I've already forgotten. And somehow it shows up exactly when I need it. You pay attention in a way no one else does.</div>
        </div>
      </div>

      <div class="reason-item">
        <div class="reason-num">05</div>
        <div class="reason-body">
          <div class="reason-title t"
            data-en="How you see the world"
            data-ar="كيف ترين العالم">How you see the world</div>
          <div class="reason-desc t"
            data-en="Through your eyes, ordinary things become extraordinary. You taught me to slow down and actually look. I'm still learning. I want to keep learning — with you."
            data-ar="من خلال عينيكِ تصبح الأشياء العادية استثنائية. علّمتِني التباطؤ والنظر الحقيقي. ما زلت أتعلم. أريد أن أستمر — معكِ.">Through your eyes, ordinary things become extraordinary. You taught me to slow down and actually look. I'm still learning. I want to keep learning — with you.</div>
        </div>
      </div>

      <div class="reason-item">
        <div class="reason-num">06</div>
        <div class="reason-body">
          <div class="reason-title t"
            data-en="The way you love me back"
            data-ar="الطريقة التي تحبينني بها">The way you love me back</div>
          <div class="reason-desc t"
            data-en="I didn't know I could feel this seen. This chosen. You make me want to be better — not because you ask me to, but because I want to deserve you."
            data-ar="لم أكن أعلم أنني أستطيع أن أشعر بهذا القدر من الرؤية والاختيار. تجعلينني أريد أن أكون أفضل — ليس لأنكِ تطلبين ذلك، بل لأنني أريد أن أستحقكِ.">I didn't know I could feel this seen. This chosen. You make me want to be better — not because you ask me to, but because I want to deserve you.</div>
        </div>
      </div>

      <div class="reason-item">
        <div class="reason-num">07</div>
        <div class="reason-body">
          <div class="reason-title t"
            data-en="Every quiet moment with you"
            data-ar="كل لحظة هادئة معكِ">Every quiet moment with you</div>
          <div class="reason-desc t"
            data-en="No words. No plans. Just us — and somehow it's always enough. More than enough. It's the kind of peace I spent years looking for."
            data-ar="بلا كلام. بلا خطط. فقط نحن — وبطريقة ما يكفي دائماً. أكثر من الكفاية. إنه نوع السلام الذي قضيت سنوات أبحث عنه.">No words. No plans. Just us — and somehow it's always enough. More than enough. It's the kind of peace I spent years looking for.</div>
        </div>
      </div>

      <div class="reason-item">
        <div class="reason-num">08</div>
        <div class="reason-body">
          <div class="reason-title t"
            data-en="Because home is wherever you are"
            data-ar="لأن البيت هو أينما كنتِ">Because home is wherever you are</div>
          <div class="reason-desc t"
            data-en="I didn't understand that word until you. Now I do. And on August 25th, I get to make it official — forever."
            data-ar="لم أفهم تلك الكلمة حتى جئتِ. الآن أفهمها. وفي الخامس والعشرين من أغسطس، سأجعلها رسمية — للأبد.">I didn't understand that word until you. Now I do. And on August 25th, I get to make it official — forever.</div>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- ══ LOVE LETTER ══ -->
<div class="letter-section">
  <div class="section-wrap reveal">
    <div class="section-heading" id="heading-letter">A <em>Letter</em> to You</div>
    <div class="section-sub t"
      data-en="Written from my heart, kept forever"
      data-ar="كُتبت من قلبي، تُحفظ إلى الأبد">Written from my heart, kept forever</div>
    <div class="letter-paper">
      <div class="letter-monogram">
        <div class="letter-monogram-circle">A &amp; A</div>
      </div>
      <div class="letter-date t"
        data-en="August 25, 2026"
        data-ar="٢٥ أغسطس ٢٠٢٦">August 25, 2026</div>
      <div class="letter-salutation t"
        data-en="My dearest Alaa,"
        data-ar="حبيبتي آلاء،">My dearest Alaa,</div>
      <p class="letter-body t"
        data-en="I've started this letter a hundred times. I never know where to begin — because where do you begin when someone is everything? When they are the reason you understand what people mean when they say "I knew"?"
        data-ar="بدأت هذه الرسالة مئة مرة. لا أعرف أبداً من أين أبدأ — لأنه من أين تبدأ حين يكون شخص ما كل شيء؟ حين يكون هو السبب الذي تفهم به ما يقصده الناس حين يقولون «عرفت»؟">
        I've started this letter a hundred times. I never know where to begin — because where do you begin when someone is everything? When they are the reason you understand what people mean when they say "I knew"?
      </p>
      <p class="letter-body t"
        data-en="I knew on March 19, 2023. I don't think I admitted it to myself right away, but I knew. There was something in the way you carried yourself — quietly certain, effortlessly kind — that made the rest of the world feel less complicated. You still do that. Every single day."
        data-ar="عرفت في التاسع عشر من مارس ٢٠٢٣. لا أعتقد أنني اعترفت بذلك لنفسي على الفور، لكنني عرفت. كان هناك شيء في طريقة تحمّلكِ لنفسكِ — هادئة واثقة، ولطيفة بلا تكلّف — جعل بقية العالم يبدو أقل تعقيداً. ما زلتِ تفعلين ذلك. كل يوم.">
        I knew on March 19, 2023. I don't think I admitted it to myself right away, but I knew. There was something in the way you carried yourself — quietly certain, effortlessly kind — that made the rest of the world feel less complicated. You still do that. Every single day.
      </p>
      <p class="letter-body t"
        data-en="I asked you on December 9th, 2025. And when you said yes, something in me exhaled that had been holding its breath for a very long time."
        data-ar="طلبت يدكِ في التاسع من ديسمبر ٢٠٢٥. وحين قلتِ نعم، تنفّس شيء في داخلي كان يحبس أنفاسه منذ وقت طويل جداً.">
        I asked you on December 9th, 2025. And when you said yes, something in me exhaled that had been holding its breath for a very long time.
      </p>
      <p class="letter-body t"
        data-en="And now — one year later, same date — I get to stand in front of everyone we love and say what I've known since the beginning: that I choose you. Today. Tomorrow. Every quiet morning and every loud, messy, beautiful day in between. I choose you."
        data-ar="والآن — بعد عام، في نفس التاريخ — أقف أمام كل من نحبهم وأقول ما عرفته منذ البداية: أنني اخترتكِ. اليوم. وغداً. وكل صباح هادئ وكل يوم صاخب وجميل بينهما. اخترتكِ.">
        And now — one year later, same date — I get to stand in front of everyone we love and say what I've known since the beginning: that I choose you. Today. Tomorrow. Every quiet morning and every loud, messy, beautiful day in between. I choose you.
      </p>
      <p class="letter-body t"
        data-en="You are my home, Alaa. And I cannot wait to spend the rest of my life making sure you never forget that."
        data-ar="أنتِ بيتي يا آلاء. ولا أستطيع الانتظار لأقضي بقية حياتي في التأكد من أنكِ لن تنسي ذلك أبداً.">
        You are my home, Alaa. And I cannot wait to spend the rest of my life making sure you never forget that.
      </p>
      <div class="letter-closing">
        <span class="letter-closing-line t"
          data-en="Yours, always and completely —"
          data-ar="لكِ، دائماً وكلياً —">Yours, always and completely —</span>
        <span class="letter-signature">Ahmed</span>
      </div>
      <p class="letter-ps t" id="letter-ps-line" data-en="" data-ar=""></p>
      <p class="letter-ar-only" lang="ar">هذه الصفحة لنا وحدنا — وكل تفصيل فيها صُنع لكِ.</p>
      <div class="letter-seal">A &amp; A</div>
    </div>
  </div>
</div>

<!-- ══ TODAY'S THOUGHT (for Alaa) ══ -->
<div class="daily-whisper-wrap reveal">
  <div class="ornament" style="margin:0 auto 8px;max-width:220px;">
    <div class="ornament-line"></div>
    <div class="ornament-diamond"></div>
    <div class="ornament-line"></div>
  </div>
  <div class="section-eyebrow t daily-whisper-eyebrow" style="margin-bottom:14px;"
    data-en="Today's thought" data-ar="كلمة اليوم">Today's thought</div>
  <p class="daily-whisper-line t" id="daily-whisper-line" data-en="" data-ar=""></p>
</div>

<!-- ══ FOOTER ══ -->
<footer>
  <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp; August 25, 2026 &nbsp;·&nbsp;
  <span class="t" data-en="Made with love" data-ar="صُنع بكل محبة">Made with love</span>
</footer>


`;

export default function LegacyIndexPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useLayoutEffect(() => {
    if (ranRef.current || !rootRef.current) return;
    ranRef.current = true;
    runIndexScripts(rootRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className="legacy-page legacy-index"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
      suppressHydrationWarning
    />
  );
}

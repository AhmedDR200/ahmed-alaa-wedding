"use client";

import { useEffect, useRef } from "react";
import "@/styles/legacy/our-song.css";
import { runOurSongScripts } from "@/lib/legacy/our-song";

const BODY_HTML = `

<!-- ══ STARFIELD ══ -->
<canvas id="starfield" aria-hidden="true"></canvas>

<!-- ══ GATE ══ -->
<div id="gate">
  <div class="gate-inner">
    <div class="gate-mono">A &amp; A</div>
    <div class="gate-title">Our Song</div>
    <div class="gate-sub">A space just for the two of us</div>

    <div class="gate-note" aria-hidden="true">
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="noteGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#7A5A28"/>
            <stop offset="60%"  stop-color="#B8975A"/>
            <stop offset="100%" stop-color="#EEE0C4"/>
          </linearGradient>
        </defs>
        <path d="M28 10 L28 46 Q28 54 20 54 Q12 54 12 47 Q12 41 20 41 Q24 41 26 43 L26 14 L52 8 L52 38 Q52 46 44 46 Q36 46 36 39 Q36 33 44 33 Q48 33 50 35 L50 14 Z"
              fill="url(#noteGrad)" />
      </svg>
    </div>

    <div class="gate-field" id="gate-field">
      <input type="password" id="gate-input" placeholder="Enter your secret" autocomplete="off" />
      <button onclick="checkPass()" aria-label="Enter">→</button>
    </div>
    <div class="gate-error" id="gate-error"></div>
    <div class="gate-hint t" data-en="A hint: the song name, in two words" data-ar="تلميح: اسم الأغنية، في كلمتين">A hint: the song name, in two words</div>
  </div>
</div>

<!-- ══ TOP NAV ══ -->
<nav class="topnav">
  <a class="topnav-mono" href="/">A &amp; A</a>
  <div class="topnav-links">
    <a href="/"     class="topnav-link"        data-page="home"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"/></svg></span><span class="t" data-en="Home" data-ar="الرئيسية">Home</span></a>
    <a href="/flame"     class="topnav-link"        data-page="flame"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10.94c2.33-3.31.17-7.82-1-8.94 0 3.4-2.24 5.3-3.67 6.7C5.9 10.11 5 12 5 14.29 5 18 8.13 21 12 21s7-3 7-6.71c0-1.71-1.23-4.4-2.33-5.59-2.09 3.36-3.26 3.36-4.67 2.24Z"/></svg></span><span class="t" data-en="Flame" data-ar="الشعلة">Flame</span></a>
    <a href="/our-song"  class="topnav-link active" data-page="song"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13M9 9l12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span><span class="t" data-en="Song" data-ar="الأغنية">Song</span></a>
    <a href="/memes"     class="topnav-link"        data-page="memes"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span><span class="t" data-en="Memes" data-ar="ميمز">Memes</span></a>
    <a href="/us"        class="topnav-link"        data-page="us"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="16" height="16" rx="2"/><circle cx="12" cy="8" r="2"/><path d="m22 13-1.3-1.3a2.4 2.4 0 0 0-3.4 0L11 18"/><path d="M18 22H4a2 2 0 0 1-2-2V6"/></svg></span><span class="t" data-en="Us" data-ar="نحن">Us</span></a>
    <a href="/secrets"   class="topnav-link"        data-page="secrets"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span><span class="t" data-en="Secrets" data-ar="أسرار">Secrets</span></a>
    <a href="/for-alaa"  class="topnav-link"        data-page="alaa"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10h-1a4 4 0 1 1 4-4v.534"/><path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/><path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/><path d="M9.77 12C4 15 2 22 2 22"/><circle cx="17" cy="8" r="2"/></svg></span><span class="t" data-en="For Alaa" data-ar="لـ آلاء">For Alaa</span></a>
  </div>
  <button class="topnav-lang" onclick="toggleLang()">عربي</button>
</nav>

<!-- ══ PAGE ══ -->
<div class="page">

  <div class="header-block">
    <div class="header-eyebrow t secret-tap-hint" id="for-alaa-secret-trigger-eyebrow" data-en="The song that says it for us" data-ar="الأغنية التي تقول كل شيء عنّا">The song that says it for us</div>
    <h1 class="header-title t secret-tap-hint" id="for-alaa-secret-trigger-title" data-en="Our Song" data-ar="أغنيتنا">Our Song</h1>
    <div class="header-sub t" data-en="Perfect · Ed Sheeran" data-ar="بيرفكت · إد شيران">Perfect · Ed Sheeran</div>
    <p class="header-quote t"
       data-en=""I found a love, for me — darling just dive right in and follow my lead.""
       data-ar="«وجدتُ حبّاً يُشبهني — يا حبيبتي، اغمري قلبكِ فيه واتبعيني.»">
      "I found a love, for me — darling just dive right in and follow my lead."
    </p>
  </div>

  <div class="ornament" id="for-alaa-secret-trigger-ornament" aria-hidden="true">
    <div class="ornament-line"></div>
    <div class="ornament-diamond secret-tap-hint" id="for-alaa-secret-trigger-diamond"></div>
    <div class="ornament-line"></div>
  </div>

  <!-- ── HERO PLAYER ── -->
  <div class="hero-player">
    <div class="hero-card">
      <div class="hero-card-inner">
        <div class="player-platform">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.4-.7.5-1.1.3-3-1.8-6.7-2.2-11.1-1.2-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.7-1.1 8.8-.6 12.1 1.4.4.2.5.7.4 1zm1.5-3.3c-.3.4-.8.6-1.2.3-3.4-2.1-8.5-2.7-12.5-1.5-.5.2-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 4.6-1.4 10.2-.8 14.1 1.6.5.3.6.9.2 1.4zm.1-3.4C15.3 8.3 8.7 8.1 5.1 9.2c-.6.2-1.2-.2-1.4-.7-.2-.6.2-1.2.7-1.4 4.2-1.3 11.4-1 15.7 1.4.5.3.7 1 .4 1.5-.3.6-1 .8-1.4.5z"/>
          </svg>
          <span class="t" data-en="Press play" data-ar="اضغط للتشغيل">Press play</span>
        </div>
        <div class="player-frame">
          <iframe
            src="https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v?utm_source=generator&theme=0"
            title="Listen on Spotify"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowfullscreen
            loading="lazy"></iframe>
        </div>
        <div class="player-note t secret-tap-hint" id="for-alaa-secret-trigger-note"
             data-en="When this song is on, the world goes quiet"
             data-ar="حين تبدأ هذه الأغنية، يصمت العالم">
          When this song is on, the world goes quiet
        </div>
      </div>
    </div>
  </div>

  <!-- ── PLAY COUNTER ── -->
  <div class="play-counter">
    <span class="play-counter-num" id="play-counter-num">0</span>
    <span class="play-counter-label t" data-en="plays together" data-ar="مرة سمعناها معاً">plays together</span>
  </div>

  <div id="for-alaa-secret" class="for-alaa-secret" hidden>
    <div class="for-alaa-secret-inner">
      <p class="for-alaa-secret-text t"
        data-en="If you found this: this whole page — every line — is for you, Alaa. Perfect was only where the playlist starts."
        data-ar="إن وصلتِ إلى هنا: هذه الصفحة بكل ما فيها — من أجلكِ يا آلاء. «بيرفكت» كانت فقط بداية القائمة.">
        If you found this: this whole page — every line — is for you, Alaa. Perfect was only where the playlist starts.
      </p>
      <button type="button" class="for-alaa-secret-close t" id="for-alaa-secret-close" data-en="Close" data-ar="إغلاق">Close</button>
    </div>
  </div>

  <!-- ── LYRIC REVEAL ── -->
  <div class="lyric-reveal" id="lyric-reveal">
    <div class="lyric-line t" data-en=""I found a love, for me"" data-ar="«وجدتُ حبّاً يُشبهني»">"I found a love, for me"</div>
    <div class="lyric-line t" data-en="darling, just dive right in and follow my lead" data-ar="يا حبيبتي، اغمري قلبكِ فيه واتبعيني">darling, just dive right in and follow my lead</div>
    <div class="lyric-line t" data-en="Baby, I'm dancing in the dark," data-ar="حبيبتي، أرقصُ في العتمة">Baby, I'm dancing in the dark,</div>
    <div class="lyric-line t" data-en="with you between my arms —" data-ar="وأنتِ بين ذراعَيّ —">with you between my arms —</div>
    <div class="lyric-line t" data-en="barefoot on the grass," data-ar="حافيين على العشب،">barefoot on the grass,</div>
    <div class="lyric-line t" data-en="listening to our favourite song." data-ar="نُصغي إلى أغنيتنا المفضّلة.">listening to our favourite song.</div>
    <div class="lyric-attr t" data-en="— Ed Sheeran, Perfect" data-ar="— إد شيران، بيرفكت">— Ed Sheeran, Perfect</div>
  </div>

  <!-- ── MORE SONGS ── -->
  <div class="more-songs">
    <div class="more-songs-eyebrow t" data-en="on repeat" data-ar="على التكرار">on repeat</div>
    <div class="more-songs-title t" data-en="Songs that remind us of each other" data-ar="أغانٍ تُذكّرنا ببعض">Songs that remind us of each other</div>
    <div class="songs-list">
      <div class="song-card" data-song="1" data-embed-url="https://open.spotify.com/embed/track/34gCuhDGsG4bRPIf9bb02f?utm_source=generator&amp;theme=0">
        <div class="song-card-inner">
          <button type="button" class="song-embed-facade" aria-label="Load and play Thinking Out Loud by Ed Sheeran">
            <span class="song-embed-facade-text">
              <span class="song-embed-facade-title">Thinking Out Loud</span>
              <span class="song-embed-facade-artist">Ed Sheeran</span>
            </span>
            <span class="song-embed-facade-play" aria-hidden="true">▶</span>
          </button>
        </div>
      </div>
      <div class="song-card" data-song="2" data-embed-url="https://open.spotify.com/embed/track/5XeFesFbtLpXzIVDNQP22n?utm_source=generator&amp;theme=0">
        <div class="song-card-inner">
          <button type="button" class="song-embed-facade" aria-label="Load and play I Wanna Be Yours by Arctic Monkeys">
            <span class="song-embed-facade-text">
              <span class="song-embed-facade-title">I Wanna Be Yours</span>
              <span class="song-embed-facade-artist">Arctic Monkeys</span>
            </span>
            <span class="song-embed-facade-play" aria-hidden="true">▶</span>
          </button>
        </div>
      </div>
      <div class="song-card" data-song="3" data-embed-url="https://open.spotify.com/embed/track/2plbrEY59IikOBgBGLjaoe?utm_source=generator&amp;theme=0">
        <div class="song-card-inner">
          <button type="button" class="song-embed-facade" aria-label="Load and play Die With A Smile by Lady Gaga and Bruno Mars">
            <span class="song-embed-facade-text">
              <span class="song-embed-facade-title">Die With A Smile</span>
              <span class="song-embed-facade-artist">Lady Gaga &amp; Bruno Mars</span>
            </span>
            <span class="song-embed-facade-play" aria-hidden="true">▶</span>
          </button>
        </div>
      </div>
      <div class="song-card" data-song="4" data-embed-url="https://open.spotify.com/embed/track/3U4isOIWM3VvDubwSI3y7a?utm_source=generator&amp;theme=0">
        <div class="song-card-inner">
          <button type="button" class="song-embed-facade" aria-label="Load and play All of Me by John Legend">
            <span class="song-embed-facade-text">
              <span class="song-embed-facade-title">All of Me</span>
              <span class="song-embed-facade-artist">John Legend</span>
            </span>
            <span class="song-embed-facade-play" aria-hidden="true">▶</span>
          </button>
        </div>
      </div>
      <div class="song-card" data-song="5" data-embed-url="https://open.spotify.com/embed/track/1dGr1c8CrMLDpV6mPbImSI?utm_source=generator&amp;theme=0">
        <div class="song-card-inner">
          <button type="button" class="song-embed-facade" aria-label="Load and play Lover by Taylor Swift">
            <span class="song-embed-facade-text">
              <span class="song-embed-facade-title">Lover</span>
              <span class="song-embed-facade-artist">Taylor Swift</span>
            </span>
            <span class="song-embed-facade-play" aria-hidden="true">▶</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="page-foot">
    <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp;
    <span class="t" data-en="Forever, on repeat" data-ar="إلى الأبد، على التكرار">Forever, on repeat</span>
  </div>

</div>


`;

export default function LegacyOurSongPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current || !rootRef.current) return;
    ranRef.current = true;
    runOurSongScripts(rootRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className="legacy-page legacy-our-song"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
      suppressHydrationWarning
    />
  );
}
